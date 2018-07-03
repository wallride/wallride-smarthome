import * as im from '@ips.su/im'
import {BaseError} from "../../../../../../../BaseError";

import {MiAbstractMessageSerializer} from "../../../../common/serialization/MiAbstractMessageSerializer";
import {MIMessageSerializationProxyFactory} from "../../../../common/serialization/factories/MIMessageSerializationProxyFactory";
import {MiDiscoveryWhoisRequestMessage} from "../models/MiDiscoveryWhoisRequestMessage";

export class MiDiscoveryWhoisMessageSerializer extends MiAbstractMessageSerializer<MiDiscoveryWhoisRequestMessage> {
    async read(message: MiDiscoveryWhoisRequestMessage, input: im.io.json.implementations.def.inputs.JSObjectInput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        throw new BaseError(this, 'Reading is not supported');
    }

    async write(message: MiDiscoveryWhoisRequestMessage, output: im.io.json.implementations.def.outputs.JSObjectOutput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        await super.write(message, output, factory);
    }
}