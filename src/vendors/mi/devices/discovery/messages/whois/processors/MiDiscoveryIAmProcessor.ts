import * as di from '@ips.su/di'

import {BaseError} from "../../../../../../../BaseError";
import {DeviceStatusEnum} from "../../../../../../../models/devices/DeviceStatusEnum";
import {IMessageProcessor} from "../../../../../../_abstract/devices/messages/processors/IMessageProcessor";
import {MiAnyDevice} from "../../../../MiAbstractDevice";
import {MiDiscoveryIAmResponseMessage} from "../models/MiDiscoveryIAmResponseMessage";
import {MiDiscoveryIAmProcessorDependency} from "./MiDiscoveryIAmProcessorDependency";

export class MiDiscoveryIAmProcessor implements IMessageProcessor<MiDiscoveryIAmResponseMessage>, di.Dependable<MiDiscoveryIAmProcessorDependency> {
    protected dependency: MiDiscoveryIAmProcessorDependency;
    getDependency(): MiDiscoveryIAmProcessorDependency {return this.dependency}
    injectDependency(dependency: MiDiscoveryIAmProcessorDependency): this {this.dependency = dependency; return this;}

    async process(message: MiDiscoveryIAmResponseMessage): Promise<void> {
        const {deviceProvider, deviceFactory, messageSender} = this.getDependency();
        let discoveredDevice: MiAnyDevice;

        if (deviceProvider.has(message.selector)) {
            try{
                discoveredDevice = await deviceProvider.update(message.selector, message.state, DeviceStatusEnum.OPERATING);
            } catch (e) {
                throw new BaseError(this, 'Failed to update device in provider', e)
                    .addItem('Message', message);
            }

            console.log(this.constructor.name, 'Existing device state is OPERATING, applied properties changes', message.state);
        }
        else {
            try {
                discoveredDevice = deviceFactory.get({
                    selector: message.selector,
                    status: DeviceStatusEnum.DISCOVERED,
                    lastUpdate: new Date(),
                    stateProperties: message.state,
                });
            } catch (e) {
                throw new BaseError(this, 'Failed to fabricate and register discovered device', message, e);
            }

            await deviceProvider.register(discoveredDevice);
            console.info(this.constructor.name, 'Discovered device registered',  message.selector);
        }


        try {
            const discoveryDevice = await deviceProvider.getDiscoveryDevice();
            await messageSender.send(
                discoveryDevice.makeGetSubdevicesMessage(),
                discoveryDevice.getSubdevicesAddress()
            )
        } catch(e){ throw new BaseError(this, 'Failed to send command (get_id_list)', e); }

    }

}