import * as di from '@ips.su/di'

import {BaseError} from "../../../BaseError";
import {DeviceSelector} from "../../../models/devices/DeviceSelector";
import {DeviceStatusEnum} from "../../../models/devices/DeviceStatusEnum";
import {IDeviceProvider} from "../../_abstract/providers/IDeviceProvider";
import {IMiDevicesConfiguration} from "../configuration/IMiDevicesConfiguration";
import {MiDiscoveryDevice} from "../devices/discovery/MiDiscoveryDevice";
import {MiVendorType} from "../MiVendor";
import {MiAnyDevice} from "../devices/MiAbstractDevice";
import {MiDeviceProviderDependency} from "./MiDeviceProviderDependency";

export class MiDeviceProvider implements IDeviceProvider<MiAnyDevice>, di.Dependable<MiDeviceProviderDependency> {
    protected dependency: MiDeviceProviderDependency;
    getDependency(): MiDeviceProviderDependency {return this.dependency}
    injectDependency(dependency: MiDeviceProviderDependency): this {this.dependency = dependency; return this;}

    protected cachedSelectorDevices = new Map<string, MiAnyDevice>();
    protected discoveryDevice: MiDiscoveryDevice;

    async setup(devicesConfiguration: IMiDevicesConfiguration): Promise<void> {
        let devices: MiAnyDevice[];
        try {
            devices = await this.getDependency().deviceAPI.find({});
        } catch (e) {
            throw new BaseError(this, 'Failed to load existing devices from DB', e);
        }
        console.log(this.constructor.name, 'Devices loaded from DB', devices.length);

        for (const device of devices) {
            this.cachedSelectorDevices.set(device.selector.toString(), device);
        }

        this.discoveryDevice = new MiDiscoveryDevice(devicesConfiguration.discovery)
            .setStatus(DeviceStatusEnum.OPERATING)
    }

    async getDiscoveryDevice(): Promise<MiDiscoveryDevice> {
        return this.discoveryDevice;
    }

    has(selector: DeviceSelector): boolean { return this.cachedSelectorDevices.has(selector.toString()); }

    async get(selector: DeviceSelector): Promise<MiAnyDevice> {
        if (!selector || !this.has(selector)) throw new BaseError(this, 'No device found').addItem('Selector', selector);

        return this.cachedSelectorDevices.get(selector.toString());
    }

    async update(selector: DeviceSelector<MiVendorType>, stateProperties: Object, status?: DeviceStatusEnum): Promise<MiAnyDevice> {
        if (!this.has(selector)) throw new BaseError(this, 'Device is not registered and cannot be updated', selector);
        const selectorString = selector.toString();
        let device = this.cachedSelectorDevices.get(selectorString);

        try{
            const changes = device.changeState(stateProperties);
            device.getState().apply(changes);
            console.log(this.constructor.name, 'update: changes', changes, '->', device.getState().getValuesObject());

            if (status) device.setStatus(status);
        } catch (e) {
            throw new BaseError(this, 'Failed to change device state', e)
                .addItem('Properties', stateProperties);
        }

        const api = this.getDependency().deviceAPI;

        try {
            await api.update(device);
        } catch (e) {
            throw new BaseError(this, 'Failed to update device via AIP', device, e);
        } finally {
            // Retrieve the final device data to keep consistency
            device = await api.getBySelector(selector);
            this.cachedSelectorDevices.set(selectorString, device);
        }

        return device;
    }

    async register(device: MiAnyDevice): Promise<void> {
        if (this.has(device.selector)) throw new BaseError(this, 'Device is already registered. Maybe update?', device.selector);

        try {
            await this.getDependency().deviceAPI.insert(device);
        } catch (e) {
            throw new BaseError(this, 'Failed to insert device via API', device, e);
        }
        this.cachedSelectorDevices.set(device.selector.toString(), device);

    }

    async delete(device: MiAnyDevice): Promise<void> {
        this.cachedSelectorDevices.delete(device.selector.toString());
    }

    async getAll(): Promise<MiAnyDevice[]> {
        return Array.from(this.cachedSelectorDevices.values());
    }



}