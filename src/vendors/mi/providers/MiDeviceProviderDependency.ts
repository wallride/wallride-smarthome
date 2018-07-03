import * as di from '@ips.su/di'

import {IDeviceAPI} from "../../_abstract/devices/api/IDeviceAPI";
import {MiAnyDevice} from "../devices/MiAbstractDevice";

export class MiDeviceProviderDependency implements di.Injectable {
    deviceAPI: IDeviceAPI<MiAnyDevice> = null;

    isValid(): boolean {
        return !!this.deviceAPI;
    }
}