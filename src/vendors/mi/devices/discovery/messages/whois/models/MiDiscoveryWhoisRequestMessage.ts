import {DeviceSelector} from "../../../../../../../models/devices/DeviceSelector";
import {MiVendorType} from "../../../../../MiVendor";
import {MiAbstractMessage} from "../../../../common/messages/MiAbstractMessage";

export class MiDiscoveryWhoisRequestMessage extends MiAbstractMessage {
    readonly cmd = 'whois';
}