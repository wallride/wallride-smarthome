import * as di from '@ips.su/di'

import {BaseError} from "../../../../../../../BaseError";
import {IMessageProcessor} from "../../../../../../_abstract/devices/messages/processors/IMessageProcessor";
import {MiDiscoveryGetSubdevicesAcknowledgeMessage} from "../models/MiDiscoveryGetSubdevicesAcknowledgeMessage";
import {MiDiscoveryReadDeviceMessage} from "../../../../common/messages/read/models/MiDiscoveryReadDeviceMessage";
import {MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency} from "./MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency";

export class MiDiscoveryGetSubdevicesAcknowledgeProcessor implements IMessageProcessor<MiDiscoveryGetSubdevicesAcknowledgeMessage>, di.Dependable<MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency> {
    protected dependency: MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency;
    getDependency(): MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency {return this.dependency}
    injectDependency(dependency: MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency): this {this.dependency = dependency; return this;}

    async process(message: MiDiscoveryGetSubdevicesAcknowledgeMessage): Promise<void> {
        const {deviceProvider, messageSender, gatewayKeyProvider, gatewaySubdevicesProvider} = this.getDependency();

        const discoveryDevice = await deviceProvider.getDiscoveryDevice();
        const address = discoveryDevice.getSubdevicesAddress();

        const subdevicesSids: string[] = [];
        for (const subdevice of message.subdevices) {
            subdevicesSids.push(subdevice.sid);
        }

        try {
            gatewayKeyProvider.updateToken(message.gateway.selector, message.gateway.token);
        } catch(e) { throw new BaseError(this, 'Failed to register token', e).addItem('Message gateway', message.gateway)}

        try {
            gatewaySubdevicesProvider.update(message.gateway.selector, subdevicesSids);
        } catch(e) {
            throw new BaseError(this, 'Failed to register gateway subdevices', e)
                .addItem('Gateway', message.gateway.selector)
                .addItem('Subdevices sid list', subdevicesSids)
        }

        for (const sid of subdevicesSids){
            const message = new MiDiscoveryReadDeviceMessage(sid);
            try {
                await messageSender.send(message, address);
            }
            catch (e) {
                throw new BaseError(this, 'Failed to send MiDiscoveryReadDeviceMessage', e).addItem('sid', sid);
            }
        }


    }

}