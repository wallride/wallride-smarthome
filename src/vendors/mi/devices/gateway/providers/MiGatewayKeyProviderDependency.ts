import * as di from '@ips.su/di'

import {MiDeviceProvider} from "../../../providers/MiDeviceProvider";

export class MiGatewayKeyProviderDependency implements di.Injectable {
    deviceProvider: MiDeviceProvider = null;

    isValid(): boolean{
        return !!this.deviceProvider
    }

}