import {DeviceSelector} from "../../../../../../../../models/devices/DeviceSelector";
import {MiVendorType} from "../../../../../../MiVendor";
import {MiAbstractMessage} from "../../../../../common/messages/MiAbstractMessage";
import {Mi86sw1SwitchDeviceType} from "../../../Mi86sw1SwitchDevice";
import {Mi86sw1SwitchKeyEventEnum} from "./Mi86sw1SwitchKeyEventEnum";

export class Mi86sw1SwitchReportMessage extends MiAbstractMessage {
    cmd: 'report';
    deviceSelector: DeviceSelector<MiVendorType, Mi86sw1SwitchDeviceType>;
    keyEvent: Mi86sw1SwitchKeyEventEnum;
}