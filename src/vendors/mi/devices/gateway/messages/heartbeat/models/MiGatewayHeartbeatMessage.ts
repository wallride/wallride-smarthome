import {DeviceSelector} from "../../../../../../../models/devices/DeviceSelector";
import {MiVendorType} from "../../../../../MiVendor";
import {MiHeartbeatMessage} from "../../../../common/messages/heartbeat/models/MiHeartbeatMessage";
import {MiGatewayDeviceType} from "../../../MiGatewayDevice";

export class MiGatewayHeartbeatMessage extends MiHeartbeatMessage {
    deviceSelector: DeviceSelector<MiVendorType, MiGatewayDeviceType>;
    token: string;
}