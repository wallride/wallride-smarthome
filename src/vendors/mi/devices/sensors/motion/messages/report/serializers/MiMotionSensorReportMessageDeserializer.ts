import * as im from "@ips.su/im";
import {BaseError} from "../../../../../../../../BaseError";
import {DeviceSelector} from "../../../../../../../../models/devices/DeviceSelector";
import {MiVendorName} from "../../../../../../MiVendor";
import {MIMessageSerializationProxyFactory} from "../../../../../common/serialization/factories/MIMessageSerializationProxyFactory";
import {MiAbstractMessageDeserializer} from "../../../../../common/serialization/MiAbstractMessageDeserializer";
import {MiMotionSensorDeviceType} from "../../../MiMotionSensorDevice";

import {MiMotionSensorReportMessage} from "../models/MiMotionSensorReportMessage";

export class MiMotionSensorReportMessageDeserializer extends MiAbstractMessageDeserializer<MiMotionSensorReportMessage> {
    async read(message: MiMotionSensorReportMessage, input: im.io.json.implementations.def.inputs.JSObjectInput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        await super.read(message, input, factory);

        message.deviceSelector = new DeviceSelector(
            MiVendorName,
            <MiMotionSensorDeviceType> input.getProperty('model').asString().getValue(),
            input.getProperty('sid').asString().getValue()
        );

        let motion: string;
        const dataEncoded = input.getProperty('data').asString().getValue();
        try {
            motion = JSON.parse(dataEncoded)['status'];
        }
        catch (e) { throw new BaseError(this, 'Failed to parse motion status', dataEncoded, e); }

        message.motionDetected = motion === 'motion';
    }

}