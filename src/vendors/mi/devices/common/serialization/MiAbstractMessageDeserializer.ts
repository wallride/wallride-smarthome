import * as im from '@ips.su/im'
import {BaseError} from "../../../../../BaseError";

import {MiAbstractMessage} from "../messages/MiAbstractMessage";
import {MIMessageSerializationProxyFactory} from "./factories/MIMessageSerializationProxyFactory";

export abstract class MiAbstractMessageDeserializer<M extends MiAbstractMessage> implements im.ISerializer<M> {
    async readObject(context: im.IFactoryTypedDeserializationContext<M, MIMessageSerializationProxyFactory>, input: im.io.AbstractInput): Promise<void> {
        if (input instanceof im.io.json.implementations.def.inputs.JSObjectInput) return await this.read(context.data, input, context.factory);
        if (input instanceof im.io.json.implementations.def.inputs.JSPlaceholderInput) return await this.read(context.data, input.asObject(), context.factory);

        throw new im.errors.UnsupportedIOTypeError(this, input);
    }

    async writeObject(context: im.IFactoryTypedSerializationContext<M, MIMessageSerializationProxyFactory>, output: im.io.AbstractOutput): Promise<void> {
        throw new BaseError(this, 'Writing is not supported');
    }

    async read(message: M, input: im.io.json.implementations.def.inputs.JSObjectInput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        message.cmd = input.getProperty('cmd').asString().getValue();
    }
}