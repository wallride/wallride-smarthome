import * as im from '@ips.su/im'

import {BaseError} from "../../../../../../../BaseError";
import {DeviceSelector} from "../../../../../../../models/devices/DeviceSelector";
import {MiVendorName} from "../../../../../MiVendor";
import {MiAbstractMessageDeserializer} from "../../../serialization/MiAbstractMessageDeserializer";
import {MIMessageSerializationProxyFactory} from "../../../serialization/factories/MIMessageSerializationProxyFactory";
import {MiReadDeviceAcknowledgeMessage} from "../models/MiReadDeviceAcknowledgeMessage";

export class MiDiscoveryReadDeviceAcknowledgeMessageDeserializer extends MiAbstractMessageDeserializer<MiReadDeviceAcknowledgeMessage> {
    async read(message: MiReadDeviceAcknowledgeMessage, input: im.io.json.implementations.def.inputs.JSObjectInput, factory: MIMessageSerializationProxyFactory): Promise<void> {
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