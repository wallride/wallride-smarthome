import * as im from '@ips.su/im'

import {BaseError} from "../../../../../BaseError";
import {IMessageProcessor} from "./IMessageProcessor";
import {IMessageProcessorFactory} from "./IMessageProcessorFactory";
import {AbstractMessage} from "../models/AbstractMessage";

export class MessageProcessorFactory<M extends AbstractMessage> implements IMessageProcessorFactory<M> {
    protected registration = new Map<Function, IMessageProcessor<M>>();

    register<MM extends M>(messageClass: Function & im.ObjectConstructor<MM>, processor: IMessageProcessor<MM>): this {
        if (this.registration.has(messageClass))
            throw new BaseError(this, 'Message class is already registered')
                .addItem('Processor class registered', this.registration.get(messageClass).constructor.name);

        if (!processor || !processor.process) throw new BaseError(this, 'Cannot register suspicious processor', processor);

        this.registration.set(messageClass, processor);

        return this;
    }

    get(message: M): IMessageProcessor<M> {
        if (!this.registration.size) throw new BaseError(this, 'Has not been set up');

        let considerFn = message.constructor;
        do {
            const processor = this.registration.get(considerFn);
            if (processor) return processor;

            considerFn = considerFn.prototype.constructor;
        } while (considerFn && considerFn.prototype && considerFn != considerFn.prototype.constructor);

        throw new BaseError(this, 'Processor is not registered for that kind of messages')
            .addItem('Message class', message.constructor.name);
    }
}