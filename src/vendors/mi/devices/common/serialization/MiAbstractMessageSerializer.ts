import * as im from '@ips.su/im'
import {BaseError} from "../../../../../BaseError";

import {MiAbstractMessage} from "../messages/MiAbstractMessage";
import {MIMessageSerializationProxyFactory} from "./factories/MIMessageSerializationProxyFactory";

export abstract class MiAbstractMessageSerializer<M extends MiAbstractMessage> implements im.ISerializer<M> {
    async readObject(context: im.IFactoryTypedDeserializationContext<M, MIMessageSerializationProxyFactory>, input: im.io.AbstractInput): Promise<void> {
        throw new BaseError(this, 'Reading is not supported');
    }

    async writeObject(context: im.IFactoryTypedSerializationContext<M, MIMessageSerializationProxyFactory>, output: im.io.AbstractOutput): Promise<void> {
        if (output instanceof im.io.json.implementations.def.outputs.JSObjectOutput) return await this.write(context.data, output, context.factory);
        if (output instanceof im.io.json.implementations.def.outputs.JSPlaceholderOutput) return await this.write(context.data, output.asObject(), context.factory);
        if (output instanceof im.io.json.implementations.def.outputs.JSONRootPlaceholderOutput) return await this.write(context.data, output.asObject(), context.factory);

        throw new im.errors.UnsupportedIOTypeError(this, output);
    }

    async write(message: M, output: im.io.json.implementations.def.outputs.JSObjectOutput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        output.addProperty('cmd').asString().setValue(message.cmd);
    }
}