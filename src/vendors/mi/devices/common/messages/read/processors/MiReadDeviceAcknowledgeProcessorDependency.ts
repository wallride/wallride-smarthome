import * as di from '@ips.su/di'

import {MiDeviceProvider} from "../../../../../providers/MiDeviceProvider";
import {MiGatewaySubdevicesProvider} from "../../../../gateway/providers/MiGatewaySubdevicesProvider";
import {MiDeviceFactory} from "../../../../MiDeviceFactory";

export class MiReadDeviceAcknowledgeProcessorDependency implements di.Injectable{
    deviceProvider: MiDeviceProvider = null;
    deviceFactory: MiDeviceFactory = null;
    gatewaySubdevicesProvider: MiGatewaySubdevicesProvider = null;

    isValid(): boolean {
        return !!( this.deviceProvider && this.deviceFactory && this.gatewaySubdevicesProvider);
    }

}