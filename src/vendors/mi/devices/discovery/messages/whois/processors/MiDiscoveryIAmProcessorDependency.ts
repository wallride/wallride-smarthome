import * as di from '@ips.su/di'

import {MiDeviceProvider} from "../../../../../providers/MiDeviceProvider";
import {MiMessageSender} from "../../../../../transport/sender/MiMessageSender";
import {MiDeviceFactory} from "../../../../MiDeviceFactory";

export class MiDiscoveryIAmProcessorDependency implements di.Injectable{
    deviceProvider: MiDeviceProvider = null;
    deviceFactory: MiDeviceFactory = null;
    messageSender: MiMessageSender = null;

    isValid(): boolean {
        return !!( this.deviceProvider && this.deviceFactory && this.messageSender);
    }

}