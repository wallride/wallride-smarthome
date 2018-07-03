import * as di from '@ips.su/di'
import {BaseError} from "../../../../../../../BaseError";
import {PropertyChange} from "../../../../../../../models/devices/changes/PropertyChange";
import {DeviceStatusEnum} from "../../../../../../../models/devices/DeviceStatusEnum";
import {IMessageProcessor} from "../../../../../../_abstract/devices/messages/processors/IMessageProcessor";
import {MiAnyDevice} from "../../../../MiAbstractDevice";
import {MiAbstractSubdevice} from "../../../../MiAbstractSubdevice";
import {MiReadDeviceAcknowledgeMessage} from "../models/MiReadDeviceAcknowledgeMessage";
import {MiReadDeviceAcknowledgeProcessorDependency} from "./MiReadDeviceAcknowledgeProcessorDependency";

export class MiReadDeviceAcknowledgeProcessor implements IMessageProcessor<MiReadDeviceAcknowledgeMessage>, di.Dependable<MiReadDeviceAcknowledgeProcessorDependency> {
    protected dependency: MiReadDeviceAcknowledgeProcessorDependency;
    getDependency(): MiReadDeviceAcknowledgeProcessorDependency {return this.dependency}
    injectDependency(dependency: MiReadDeviceAcknowledgeProcessorDependency): this {this.dependency = dependency; return this;}

    async process(message: MiReadDeviceAcknowledgeMessage): Promise<void> {
        const {deviceProvider, gatewaySubdevicesProvider, deviceFactory} = this.getDependency();

        let device: MiAnyDevice;
        if (deviceProvider.has(message.deviceSelector)) {
            try{
                device = await deviceProvider.update(message.deviceSelector, message.stateProperties, DeviceStatusEnum.OPERATING);
            } catch (e) {
                throw new BaseError(this, 'Failed to update device in provider', e)
                    .addItem('Message', message);
            }

            console.log(this.constructor.name, 'Existing device state is OPERATING, applied properties changes', message.stateProperties);
        }
        else {
            device = deviceFactory.get({
                selector: message.deviceSelector,
                status: DeviceStatusEnum.OPERATING,
                lastUpdate: new Date(),
                stateProperties: message.stateProperties
            });
            if (device instanceof MiAbstractSubdevice) {
                device.setGateway(
                    gatewaySubdevicesProvider.getGatewaySelector(message.deviceSelector.id)
                );
            }

            await deviceProvider.register(device);

            console.log(this.constructor.name, 'Created new device', device, message.stateProperties);
        }

    }

}