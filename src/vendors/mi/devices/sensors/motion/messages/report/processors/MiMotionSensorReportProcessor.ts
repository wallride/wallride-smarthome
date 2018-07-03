import * as di from '@ips.su/di'

import {BaseError} from "../../../../../../../../BaseError";
import {DeviceStatusEnum} from "../../../../../../../../models/devices/DeviceStatusEnum";
import {IMessageProcessor} from "../../../../../../../_abstract/devices/messages/processors/IMessageProcessor";
import {MiMotionSensorDevice} from "../../../MiMotionSensorDevice";
import {MiMotionSensorReportMessage} from "../models/MiMotionSensorReportMessage";
import {MiMotionSensorReportProcessorDependency} from "./MiMotionSensorReportProcessorDependency";

export class MiMotionSensorReportProcessor implements IMessageProcessor<MiMotionSensorReportMessage>, di.Dependable<MiMotionSensorReportProcessorDependency> {
    protected dependency: MiMotionSensorReportProcessorDependency;
    getDependency(): MiMotionSensorReportProcessorDependency {return this.dependency}
    injectDependency(dependency: MiMotionSensorReportProcessorDependency): this {this.dependency = dependency; return this;}

    async process(message: MiMotionSensorReportMessage): Promise<void> {
        const {deviceProvider} = this.getDependency();

        const state = {};
        console.log(this.constructor.name, 'processing', message);

        if (message.motionDetected) {
            console.log(this.constructor.name, 'motion detected, update state');
            try {
                await deviceProvider.update(message.deviceSelector, {lastMotion: new Date()}, DeviceStatusEnum.OPERATING);
            } catch (e) {
                throw new BaseError(this, 'Failed to update device in provider', e)
                    .addItem('Message', message);
            }
        }

        console.log(this.constructor.name, message.deviceSelector, 'Motion detected:', message.motionDetected);

    }


}