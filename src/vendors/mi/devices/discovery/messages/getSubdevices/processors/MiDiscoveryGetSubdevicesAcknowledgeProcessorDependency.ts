import * as di from '@ips.su/di'

import {MiDeviceProvider} from "../../../../../providers/MiDeviceProvider";
import {MiGatewayKeyProvider} from "../../../../gateway/providers/MiGatewayKeyProvider";
import {MiGatewaySubdevicesProvider} from "../../../../gateway/providers/MiGatewaySubdevicesProvider";
import {MiMessageSender} from "../../../../../transport/sender/MiMessageSender";

export class MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency implements di.Injectable{
    deviceProvider: MiDeviceProvider = null;
    messageSender: MiMessageSender = null;
    gatewaySubdevicesProvider: MiGatewaySubdevicesProvider = null;
    gatewayKeyProvider: MiGatewayKeyProvider = null;

    isValid(): boolean {
        return !!( this.deviceProvider && this.messageSender && this.gatewaySubdevicesProvider && this.gatewayKeyProvider);
    }

}