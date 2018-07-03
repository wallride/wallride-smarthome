import * as di from '@ips.su/di'

import {AbstractDevice} from "../../models/devices/AbstractDevice";
import {IDeviceProvider} from "./providers/IDeviceProvider";

export class VendorDependency implements di.Injectable {
    deviceProvider: IDeviceProvider<AbstractDevice> = null;

    isValid(): boolean {
        return !! (this.deviceProvider)
    }
}