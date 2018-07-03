import * as im from '@ips.su/im'
import {BaseError} from "../BaseError";

export abstract class AbstractSerializationProxyFactory<M> extends im.factories.AbstractProxySerializationFactory<M> {
    protected abstract identifyTarget(input: im.io.AbstractInput): Function;

    async deserialize<K extends M>(input: im.io.AbstractInput): Promise<K> {
        const target = await this.identifyTarget(input);
        if (!target) throw new BaseError(this, 'Failed to resolve target class function');

        return await this.getDependency().classFactory.deserialize<K>(input, {target});
    }

    serialize(what: M, output: im.io.AbstractOutput): Promise<boolean> {
        return this.getDependency().classFactory.serialize(what, output);
    }
}