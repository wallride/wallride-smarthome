import * as di from '@ips.su/di'

import {BaseError} from "../../../../BaseError";
import {IMessageProcessor} from "../../devices/messages/processors/IMessageProcessor";
import {AbstractMessage} from "../../devices/messages/models/AbstractMessage";
import {ITransportPacket} from "../../transport/ITransport";
import {SerializableMessageProviderDependency} from "./SerializableMessageProviderDependency";

export class SerializableMessageProvider<M extends AbstractMessage, T, P extends ITransportPacket<T>> implements di.Dependable<SerializableMessageProviderDependency<M, T, P>> {
    protected dependency: SerializableMessageProviderDependency<M, T, P>;
    getDependency(): SerializableMessageProviderDependency<M, T, P> {return this.dependency}
    injectDependency(dependency: SerializableMessageProviderDependency<M, T, P>): this {this.dependency = dependency; return this;}

    async setup(): Promise<void> {
        // Subscribe for transport incoming data
        await this.getDependency().transport.setup(async (packet: P)=>{
            await this.consume(packet)
        });
    }

    async consume(packet: P): Promise<void> {
        const encodedMessage = packet.data;
        const {parser, messageSerializationFactory, messageProcessorFactory} = this.getDependency();
        let message: M;
        try {
            const input = await parser.parse(encodedMessage);
            message = await messageSerializationFactory.deserialize(input);
        } catch (e) {
            throw new BaseError(this, 'Message parse failed', encodedMessage.toString(), e);
        }

        if (!message) { throw new BaseError(this, 'Parsed message is empty')
            .addItem('Raw message data', encodedMessage.toString())
            .addItem('Parsed result', message);
        }

        let processor: IMessageProcessor<M>;
        try {
            processor = messageProcessorFactory.get(message);
        } catch (e) {
            throw new BaseError(this, 'Failed to get processor for the message', message, e);
        }

        console.log(this.constructor.name, message.constructor.name, 'processing with', processor.constructor.name, '...');
        try {
            await processor.process(message);
        } catch (e) {
            throw new BaseError(this, 'Process Message failed', encodedMessage.toString(), message, e)
                .addItem('Processor class', processor && processor.constructor.name);
        }

    }

}