import * as im from '@ips.su/im'

import {DeviceSelector} from "../../../../../../../models/devices/DeviceSelector";
import {MiVendorName, MiVendorType} from "../../../../../MiVendor";
import {MiAbstractMessageDeserializer} from "../../../../common/serialization/MiAbstractMessageDeserializer";
import {MIMessageSerializationProxyFactory} from "../../../../common/serialization/factories/MIMessageSerializationProxyFactory";
import {MiGatewayDeviceName, MiGatewayDeviceType} from "../../../../gateway/MiGatewayDevice";
import {MiDiscoveryGetSubdevicesAcknowledgeMessage} from "../models/MiDiscoveryGetSubdevicesAcknowledgeMessage";

export class MiDiscoveryGetSubdevicesAcknowledgeMessageDeserializer extends MiAbstractMessageDeserializer<MiDiscoveryGetSubdevicesAcknowledgeMessage> {
    protected parser = new im.io.json.implementations.def.JSONStringParser(new im.io.json.settings.JSONStringSettings({}));

    async read(message: MiDiscoveryGetSubdevicesAcknowledgeMessage, input: im.io.json.implementations.def.inputs.JSObjectInput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        await super.read(message, input, factory);

        message.gateway = {
            selector: new DeviceSelector<MiVendorType, MiGatewayDeviceType>(
                MiVendorName,
                MiGatewayDeviceName,
                input.getProperty('sid').asString().getValue()
            ),
            token: input.getProperty('token').asString().getValue()
        };
        const dataInput = await this.parser.parse(
            input.getProperty('data').asString().getValue()
        );

        message.subdevices = [];
        for (const item of dataInput.asArray()){
            message.subdevices.push({sid: item.asString().getValue()})
        }
    }


}