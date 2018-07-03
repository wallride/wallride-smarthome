import {DeviceSelector} from "../../../../../../../models/devices/DeviceSelector";
import {AbstractMessage} from "../../../../../../_abstract/devices/messages/models/AbstractMessage";
import {MiVendorType} from "../../../../../MiVendor";

export class MiReadDeviceAcknowledgeMessage extends AbstractMessage{
    cmd: 'read_ack';
    deviceSelector: DeviceSelector<MiVendorType>;
    stateProperties: Object;
}
