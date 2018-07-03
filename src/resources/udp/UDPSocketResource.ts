import * as dgram from 'dgram'

import {BaseError} from "../../BaseError";
import {ITransportResource} from "../ITransportResource";
import {UDPResourceConfigurationType} from "./UDPResourceConfigurationType";
import {UDPSocketResourceProvider} from "./UDPSocketResourceProvider";
import {UDPSocketSendOptionsType} from "./UDPSocketSendOptionsType";
import {UDPResourceDataConsumerType} from "./UDPResourceDataConsumerType";

export class UDPSocketResource implements ITransportResource<Buffer> {
    protected consumers = new Set<UDPResourceDataConsumerType>();
    protected onCloseCallbacks = new Set<Function>();
    protected alive: boolean = true;

    constructor(
        protected provider: UDPSocketResourceProvider,
        protected socket: dgram.Socket,
        protected config: UDPResourceConfigurationType
    ) {
        socket.on('message', (data, remote) => {
console.log('\n<---', this.constructor.name, data.toString(), 'from', remote.address+':'+remote.port);
            for (const callback of this.consumers)
                callback(data, {host: remote.address, port: remote.port}).then();
        });

        socket.on('close', async () => {
            this.alive = false;
            await this.provider.release(this.getURI());

            for (const callback of this.onCloseCallbacks)
                callback();
        });
        socket.on('error', async (err) => {
            this.alive = false;
            console.log(new BaseError(this, 'Socket error', err));

            await this.provider.release(this.getURI());
        });
    }

    isAlive(): boolean { return this.alive; }

    send(options: UDPSocketSendOptionsType): Promise<void> {
        return new Promise((done, fail)=>{
            if (!this.isAlive()) return fail(new BaseError(this, 'Socket is dead').addItem('Options', options));

            try {
                this.socket.send(options.data, options.address.port, options.address.host, error => {
                    if (error) return fail(new BaseError(this, 'Socket send failed', error).addItem('Options', options));
console.log('--->', this.constructor.name, options.data.toString(), 'to', options.address.host+':'+options.address.port);
                    return done();
                })
            } catch(e) { return fail(new BaseError(this, 'Socket send failed', e).addItem('Options', options)) }
        });
    }

    subscribe(callback: UDPResourceDataConsumerType): this {
        this.consumers.add(callback);

        return this;
    }

    onClose(callback: Function): this {
        this.onCloseCallbacks.add(callback);

        return this;
    }


    release(): Promise<void> {
        if (!this.alive) return Promise.resolve();

        this.alive = false;
        return new Promise((done)=>{
            this.socket.close(done)
        })
    }

    getURI(): string {return this.config.uri}
}
