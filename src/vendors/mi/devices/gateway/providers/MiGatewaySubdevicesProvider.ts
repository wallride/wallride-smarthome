import {BaseError} from "../../../../../BaseError";
import {DeviceSelector} from "../../../../../models/devices/DeviceSelector";
import {MiGatewayDeviceType} from "../MiGatewayDevice";
import {MiVendorType} from "../../../MiVendor";

export class MiGatewaySubdevicesProvider {
    protected gatewaySubdevices = new Map<string, string[]>(); // gateway sid => subdevice sids array
    protected subdeviceGateway = new Map<string, DeviceSelector<MiVendorType, MiGatewayDeviceType>>(); // subdevice sid => gateway selector

    update(gatewaySelector: DeviceSelector<MiVendorType, MiGatewayDeviceType>, subdevicesSids: string[]): void {
        const oldList = this.gatewaySubdevices.get(gatewaySelector.id);
        for (const sid of oldList || []) this.subdeviceGateway.delete(sid);

        this.gatewaySubdevices.set(gatewaySelector.id, subdevicesSids);
        for (const sid of subdevicesSids) this.subdeviceGateway.set(sid, gatewaySelector);
    }

    getGatewaySelector(subdeviceSid: string): DeviceSelector<MiVendorType, MiGatewayDeviceType> {
        if (!this.subdeviceGateway.has(subdeviceSid)) throw new BaseError(this, 'This subdevice is not registered in gateways\' child devices')
            .addItem('Child sid', subdeviceSid);

        return this.subdeviceGateway.get(subdeviceSid);
    }
}