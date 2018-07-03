import * as di from '@ips.su/di'

import {AbstractDevice} from "../../../../models/devices/AbstractDevice";
import {IDeviceFactory} from "../IDeviceFactory";

export class DevicesAPIDependency<Device extends AbstractDevice = AbstractDevice> implements di.Injectable{
    deviceFactory: IDeviceFactory<Device> = null;

    isValid(): boolean {
        return !!(this.deviceFactory);
    }
}