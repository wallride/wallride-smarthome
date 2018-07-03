import * as os from 'os'
import * as dgram from 'dgram'

import {BaseError} from "../../BaseError";
import {ITransportResourceProvider} from "../ITransportResourceProvider";
import {UDPResourceConfigurationType} from "./UDPResourceConfigurationType";
import {UDPSocketResource} from "./UDPSocketResource";

export class UDPSocketResourceProvider implements ITransportResourceProvider<Buffer> {
    protected uriResources = new Map<string, UDPSocketResource>();
    protected uriConfigMap = new Map<string,UDPResourceConfigurationType>();
    protected selfIP: string;

    constructor(configuration: UDPResourceConfigurationType[] = []) {
        for (const config of configuration) this.addConfiguration(config);

        // console.log(os.networkInterfaces());
        for (const iface of Object.values(os.networkInterfaces())) {
            if (this.selfIP) break;
            for (const connection of iface) {
                if (connection.family === 'IPv4' && connection.address.match(/^192\./)) {
                    this.selfIP = connection.address;
                    break;
                }
            }
        }

        console.log(this.constructor.name, 'Self IP detected', this.selfIP);
    }

    addConfiguration(config: UDPResourceConfigurationType): this {
        this.uriConfigMap.set(config.uri, config);

        return this;
    }

    protected registerResource(resource: UDPSocketResource): UDPSocketResource {
        this.uriResources.set(resource.getURI(), resource);

        return resource;
    }

    protected getConfig(uri: string): UDPResourceConfigurationType {
        const result = this.uriConfigMap.get(uri);
        if (!result) throw new BaseError(this, 'No configuration for the uri', uri);

        return result;
    }

    async release(uri: string): Promise<void> {
        const resource = this.uriResources.get(uri);
        if (!resource) return;

        this.uriResources.delete(uri);
        if (resource.isAlive()) await resource.release();
    }

    get(uri: string): Promise<UDPSocketResource> {
        if (this.uriResources.has(uri)) return Promise.resolve(this.uriResources.get(uri));

        const config = this.getConfig(uri);
        const {broadcast, port, multicast, reuseAddr} = config.bind;

        const socket = dgram.createSocket(
            {
                type: config.type || 'udp4',
                reuseAddr: reuseAddr
            }
        );

        return new Promise((done, fail) => {
            socket.bind({port}, () => {
                if (multicast) {
                    try {
                        socket.addMembership(multicast.membershipHost, this.selfIP);
                        socket.setMulticastTTL(multicast.ttl || 128);
                        socket.setMulticastLoopback(!!multicast.loopback);
                    } catch(e) { return fail(new BaseError(this, 'Failed to set multicast', multicast, e)) }
                }
                else if (broadcast) {
                    try {
                        socket.setBroadcast(true);
                    } catch(e) { return fail(new BaseError(this, 'Failed to set broadcast', e)) }
                }
            });

            socket.once('error', (err) => {
                return fail(new BaseError(this, 'Failed listening', uri, err));
            });

            socket.on('listening', () => {
                console.log('listening at', uri, socket.address());
                done(this.registerResource(new UDPSocketResource(this, socket, config)))
            })
        });
    }
}