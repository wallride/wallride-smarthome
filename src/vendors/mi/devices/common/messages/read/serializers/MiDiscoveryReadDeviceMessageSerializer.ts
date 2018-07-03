import * as im from '@ips.su/im'
import {BaseError} from "../../../../../../../BaseError";

import {MiAbstractMessageSerializer} from "../../../serialization/MiAbstractMessageSerializer";
import {MIMessageSerializationProxyFactory} from "../../../serialization/factories/MIMessageSerializationProxyFactory";
import {MiDiscoveryReadDeviceMessage} from "../models/MiDiscoveryReadDeviceMessage";

export class MiDiscoveryReadDeviceMessageSerializer extends MiAbstractMessageSerializer<MiDiscoveryReadDeviceMessage> {
    async read(message: MiDiscoveryReadDeviceMessage, input: im.io.json.implementations.def.inputs.JSObjectInput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        throw new BaseError(this, 'Reading is not supported');
    }

    async write(message: MiDiscoveryReadDeviceMessage, output: im.io.json.implementations.def.outputs.JSObjectOutput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        await super.write(message, output, factory);

        output.addProperty('sid').asString().setValue(message.sid);
    }
}