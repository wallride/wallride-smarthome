import {DeviceSelector} from "../../../../../../../models/devices/DeviceSelector";
import {MiVendorType} from "../../../../../MiVendor";
import {MiAbstractMessage} from "../../../../common/messages/MiAbstractMessage";

export class MiDiscoveryGetSubdevicesAcknowledgeMessage extends MiAbstractMessage {
    readonly cmd = 'get_id_list_ack';

    gateway: {
        selector: DeviceSelector<MiVendorType, 'gateway'>
        token: string;
    };

    subdevices: {
        sid: string;
    } []
}