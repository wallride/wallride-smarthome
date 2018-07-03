import {VendorDependency} from "../_abstract/VendorDependency";
import {MiMessageProvider} from "./providers/message/MiMessageProvider";
import {MiDeviceProvider} from "./providers/MiDeviceProvider";
import {MiMessageSender} from "./transport/sender/MiMessageSender";

export class MiVendorDependency extends VendorDependency {
    deviceProvider: MiDeviceProvider = null;
    messageSender: MiMessageSender = null;
    messageProvider: MiMessageProvider = null;

    isValid(): boolean {
        return !!(super.isValid() && this.messageSender && this.messageProvider);
    }
}