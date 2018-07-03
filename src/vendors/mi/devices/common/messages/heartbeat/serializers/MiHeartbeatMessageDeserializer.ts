import * as im from '@ips.su/im'

import {BaseError} from "../../../../../../../BaseError";
import {DeviceSelector} from "../../../../../../../models/devices/DeviceSelector";
import {MiVendorName} from "../../../../../MiVendor";
import {MiAbstractMessageDeserializer} from "../../../serialization/MiAbstractMessageDeserializer";
import {MIMessageSerializationProxyFactory} from "../../../serialization/factories/MIMessageSerializationProxyFactory";
import {MiHeartbeatMessage} from "../models/MiHeartbeatMessage";

export class MiHeartbeatMessageDeserializer<M extends MiHeartbeatMessage = MiHeartbeatMessage> extends MiAbstractMessageDeserializer<M> {
    async read(message: M, input: im.io.json.implementations.def.inputs.JSObjectInput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        await super.read(message, input, factory);

        message.deviceSelector = new DeviceSelector(
            MiVendorName,
            input.getProperty('model').asString().getValue(),
            input.getProperty('sid').asString().getValue()
        );

        try {
            message.stateProperties = JSON.parse(input.getProperty('data').asString().getValue())
        } catch(e) { throw new BaseError(this, 'Failed to parse data section to properties values object') }
    }
}