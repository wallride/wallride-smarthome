import * as im from "@ips.su/im";
import {BaseError} from "../../../../../../../../BaseError";

import {DeviceSelector} from "../../../../../../../../models/devices/DeviceSelector";
import {MiVendorName} from "../../../../../../MiVendor";
import {MIMessageSerializationProxyFactory} from "../../../../../common/serialization/factories/MIMessageSerializationProxyFactory";
import {MiAbstractMessageDeserializer} from "../../../../../common/serialization/MiAbstractMessageDeserializer";
import {Mi86sw1SwitchDeviceType} from "../../../Mi86sw1SwitchDevice";
import {Mi86sw1SwitchKeyEventEnum} from "../models/Mi86sw1SwitchKeyEventEnum";

import {Mi86sw1SwitchReportMessage} from "../models/Mi86sw1SwitchReportMessage";

export class Mi86sw1SwitchReportMessageDeserializer extends MiAbstractMessageDeserializer<Mi86sw1SwitchReportMessage> {
    async read(message: Mi86sw1SwitchReportMessage, input: im.io.json.implementations.def.inputs.JSObjectInput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        await super.read(message, input, factory);

        message.deviceSelector = new DeviceSelector(
            MiVendorName,
            <Mi86sw1SwitchDeviceType> input.getProperty('model').asString().getValue(),
            input.getProperty('sid').asString().getValue()
        );

        const dataEncoded = input.getProperty('data').asString().getValue();
        try {
            const data = JSON.parse(dataEncoded);
            message.keyEvent = <Mi86sw1SwitchKeyEventEnum> data['channel_0'];
        }
        catch (e) { throw new BaseError(this, 'Failed to parse data', dataEncoded, e); }

    }

}