import * as di from '@ips.su/di'

import {BaseError} from "../../../../../../../BaseError";
import {PropertyChange} from "../../../../../../../models/devices/changes/PropertyChange";
import {DeviceStatusEnum} from "../../../../../../../models/devices/DeviceStatusEnum";
import {IMessageProcessor} from "../../../../../../_abstract/devices/messages/processors/IMessageProcessor";
import {MiHeartbeatMessage} from "../models/MiHeartbeatMessage";
import {MiHeartbeatProcessorDependency} from "./MiHeartbeatProcessorDependency";

export class MiHeartbeatProcessor implements IMessageProcessor<MiHeartbeatMessage>, di.Dependable<MiHeartbeatProcessorDependency> {
    protected dependency: MiHeartbeatProcessorDependency;
    getDependency(): MiHeartbeatProcessorDependency {return this.dependency}
    injectDependency(dependency: MiHeartbeatProcessorDependency): this {this.dependency = dependency; return this;}

    async process(message: MiHeartbeatMessage): Promise<void> {
        const {deviceProvider} = this.getDependency();

        if (deviceProvider.has(message.deviceSelector)) {
            const device = await deviceProvider.get(message.deviceSelector);

            // @todo make changes in DB
            let changes: PropertyChange[];

            try{
                changes = device.changeState(message.stateProperties);
            } catch (e) {
                throw new BaseError(this, 'Failed to make properties changes', e)
                    .addItem('Message', message);
            }

            device.getState().apply(changes);
            device.setStatus(DeviceStatusEnum.OPERATING);

            console.log(this.constructor.name, 'Heartbeat applied properties', message.stateProperties);

            return;
        }

        console.log(this.constructor.name, 'Device is not registered, ignore', message.deviceSelector);

    }
}