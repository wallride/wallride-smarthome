import {DeviceSelector} from "../../../../../../../models/devices/DeviceSelector";
import {AbstractMessage} from "../../../../../../_abstract/devices/messages/models/AbstractMessage";
import {MiVendorType} from "../../../../../MiVendor";

export class MiHeartbeatMessage extends AbstractMessage{
    cmd: 'heartbeat';
    deviceSelector: DeviceSelector<MiVendorType>;
    stateProperties: Object;
}
