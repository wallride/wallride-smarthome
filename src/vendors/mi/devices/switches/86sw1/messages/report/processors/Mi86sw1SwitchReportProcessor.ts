import * as di from '@ips.su/di'

import {BaseError} from "../../../../../../../../BaseError";
import {DeviceStatusEnum} from "../../../../../../../../models/devices/DeviceStatusEnum";
import {IMessageProcessor} from "../../../../../../../_abstract/devices/messages/processors/IMessageProcessor";
import {Mi86sw1SwitchKeyEventEnum} from "../models/Mi86sw1SwitchKeyEventEnum";
import {Mi86sw1SwitchReportMessage} from "../models/Mi86sw1SwitchReportMessage";
import {Mi86sw1SwitchReportProcessorDependency} from "./Mi86sw1SwitchReportProcessorDependency";

export class Mi86sw1SwitchReportProcessor implements IMessageProcessor<Mi86sw1SwitchReportMessage>, di.Dependable<Mi86sw1SwitchReportProcessorDependency> {
    protected dependency: Mi86sw1SwitchReportProcessorDependency;
    getDependency(): Mi86sw1SwitchReportProcessorDependency {return this.dependency}
    injectDependency(dependency: Mi86sw1SwitchReportProcessorDependency): this {this.dependency = dependency; return this;}

    async process(message: Mi86sw1SwitchReportMessage): Promise<void> {
        const {deviceProvider} = this.getDependency();

        if (message.keyEvent === Mi86sw1SwitchKeyEventEnum.LONG_CLICK) return; // skip this duplicating event

        try {
            await deviceProvider.update(message.deviceSelector, {lastEvent: message.keyEvent}, DeviceStatusEnum.OPERATING);
        } catch (e) {
            throw new BaseError(this, 'Failed to update device in provider', e)
                .addItem('Message', message);
        }
    }
}