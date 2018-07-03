import * as di from '@ips.su/di'
import {BaseError} from "../../../../BaseError";

import {NetworkAddressType} from "../../../../resources/NetworkAddressType";
import {UDPSocketResource} from "../../../../resources/udp/UDPSocketResource";
import {ITCPTransport, ITCPTransportPacket} from "../ITCPTransport";
import {UDPTransportDependency} from "./UDPTransportDependency";


export type UDPTransportOptions = {
    uri: string,
    autoReconnect?: boolean;
}

export class UDPTransport implements ITCPTransport, di.Dependable<UDPTransportDependency>{
    protected dependency: UDPTransportDependency;
    injectDependency(dependency: UDPTransportDependency): this { this.dependency = dependency; return this; }
    getDependency(): UDPTransportDependency { return this.dependency}

    protected resourcePromise: Promise<UDPSocketResource>;
    protected subscriberCallback: Function & {(packet: ITCPTransportPacket): Promise<void>};

    constructor(protected options: UDPTransportOptions) {}

    async setup(callback: Function & {(packet: ITCPTransportPacket): Promise<void>}): Promise<void> {
        if (this.subscriberCallback) throw new BaseError(this, 'Transport has already been setup');
        this.subscriberCallback = callback;

        await this.getResource();
    }

    async send(packet: ITCPTransportPacket): Promise<void> {
        try {
            const resource = await this.getResource();
            await resource.send(packet);
        } catch(e) { throw new BaseError(this, 'UDP Transport failed to send outgoing packet', packet, e); }
    }


    protected getResource(): Promise<UDPSocketResource> {
        if (this.resourcePromise) return this.resourcePromise;

        const {resourceProvider} = this.getDependency();

        this.resourcePromise = resourceProvider.get(this.options.uri);

        this.resourcePromise.then(resource => {
            resource.onClose(()=>{
                this.resourcePromise = null;
                if (this.options.autoReconnect) this.getResource();
            });

            resource.subscribe(async (data: Buffer, address: NetworkAddressType) => {
                if (!this.subscriberCallback) {
                    console.warn(this.constructor.name, 'Resource provided some data, but Transport has no subscribed callback set up', data, address);
                    return;
                }

                try {
                    await this.subscriberCallback({data, address});
                } catch(e) { console.log(e.message) }
            })
        });

        return this.resourcePromise;
    }

}