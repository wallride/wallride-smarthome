import {BaseError} from "../../BaseError";
import {DeviceSelector} from "./DeviceSelector";
import {DeviceState} from "./DeviceState";
import {DeviceStatusEnum} from "./DeviceStatusEnum";
import {DeviceModuleTypeEnum} from "./modules/DeviceModuleTypeEnum";
import {IDeviceModule} from "./modules/IDeviceModule";

export abstract class AbstractDevice {
    protected status: DeviceStatusEnum;
    protected state: DeviceState;

    protected modules: IDeviceModule[];

    protected constructor(public selector: DeviceSelector) {}

    /**
     * Modules are external interfaces (or facades) to access device's state properties in terms of common domain.
     * In other words they provide state properties mapping between common domain and vendor device's domain
     */
    protected abstract makeModules(): IDeviceModule[];

    /**
     * Modules are generated and cached in the device on demand, when needed.
     */
    getModules(): IDeviceModule[] {
        return this.modules || (this.modules = this.makeModules())
    }

    getModuleByName(name: string): IDeviceModule {
        for (const module of this.getModules())
            if (module.name === name) return module;

        throw new BaseError(this, 'Module does not exist in device')
            .addItem('Device selector', this.selector)
            .addItem('Module name', name);
    }

    getModulesByType<T extends DeviceModuleTypeEnum>(type: T): IDeviceModule<T>[] {
        const result = [];

        for (const module of this.getModules())
            if (module.type === type) result.push(module);

        return [];
    }

    getStatus(): DeviceStatusEnum {
        return this.status;
    }

    /**
     * Probably this is wrong. But needed for base API to retrieve properties... Need to think more on it
     */
    getState(): DeviceState { return this.state; }
}