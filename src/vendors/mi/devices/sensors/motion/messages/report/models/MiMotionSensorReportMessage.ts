import {DeviceSelector} from "../../../../../../../../models/devices/DeviceSelector";
import {MiVendorType} from "../../../../../../MiVendor";
import {MiAbstractMessage} from "../../../../../common/messages/MiAbstractMessage";
import {MiMotionSensorDeviceType} from "../../../MiMotionSensorDevice";

export class MiMotionSensorReportMessage extends MiAbstractMessage {
    cmd: 'report';
    deviceSelector: DeviceSelector<MiVendorType, MiMotionSensorDeviceType>;
    motionDetected: boolean
}