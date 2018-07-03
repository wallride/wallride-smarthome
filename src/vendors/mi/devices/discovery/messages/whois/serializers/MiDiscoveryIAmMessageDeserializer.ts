import * as im from '@ips.su/im'

import {DeviceSelector} from "../../../../../../../models/devices/DeviceSelector";
import {MiVendorName} from "../../../../../MiVendor";
import {MiAbstractMessageDeserializer} from "../../../../common/serialization/MiAbstractMessageDeserializer";
import {MIMessageSerializationProxyFactory} from "../../../../common/serialization/factories/MIMessageSerializationProxyFactory";
import {MiDiscoveryIAmResponseMessage} from "../models/MiDiscoveryIAmResponseMessage";

export class MiDiscoveryIAmMessageDeserializer extends MiAbstractMessageDeserializer<MiDiscoveryIAmResponseMessage> {
    async read(message: MiDiscoveryIAmResponseMessage, input: im.io.json.implementations.def.inputs.JSObjectInput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        await super.read(message, input, factory);

        message.selector = new DeviceSelector(
            MiVendorName,
            input.getProperty('model').asString().getValue(),
            input.getProperty('sid').asString().getValue()
        );
        message.state = {
            ip: input.getProperty('ip').asString().getValue(),
            port: parseInt(input.getProperty('port').asString().getValue(), 10),
            protoVersion: input.getProperty('proto_version').asString().getValue()
        }
    }
}