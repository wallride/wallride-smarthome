import * as di from '@ips.su/di'

import {MiHeartbeatProcessor} from "../../../../common/messages/heartbeat/processors/MiHeartbeatProcessor";
import {MiGatewayHeartbeatMessage} from "../models/MiGatewayHeartbeatMessage";
import {MiGatewayHeartbeatProcessorDependency} from "./MiGatewayHeartbeatProcessorDependency";

export class MiGatewayHeartbeatProcessor extends MiHeartbeatProcessor implements di.Dependable<MiGatewayHeartbeatProcessorDependency> {
    protected dependency: MiGatewayHeartbeatProcessorDependency;
    getDependency(): MiGatewayHeartbeatProcessorDependency {return this.dependency}
    injectDependency(dependency: MiGatewayHeartbeatProcessorDependency): this {this.dependency = dependency; return this;}

    async process(message: MiGatewayHeartbeatMessage): Promise<void> {
        await super.process(message);

        this.getDependency().gatewayKeyProvider.updateToken(message.deviceSelector, message.token);
    }

}