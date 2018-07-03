import {DeviceSelector} from "../../../../../../../models/devices/DeviceSelector";
import {MiVendorType} from "../../../../../MiVendor";
import {MiAbstractMessage} from "../../../../common/messages/MiAbstractMessage";

export class MiDiscoveryIAmResponseMessage extends MiAbstractMessage {
    readonly cmd = 'iam';

    selector: DeviceSelector<MiVendorType>;
    state: {
        ip: string;
        port: number;
        protoVersion: string;
    }
}