import * as di from '@ips.su/di'

import {MiDeviceProvider} from "../../../../../providers/MiDeviceProvider";
import {MiGatewayKeyProvider} from "../../../providers/MiGatewayKeyProvider";

export class MiGatewayHeartbeatProcessorDependency implements di.Injectable{
    deviceProvider: MiDeviceProvider = null;
    gatewayKeyProvider: MiGatewayKeyProvider = null;

    isValid(): boolean {
        return !!( this.deviceProvider && this.gatewayKeyProvider);
    }

}