import {DeviceModuleTypeEnum} from "./DeviceModuleTypeEnum";

// Modules are utilitarian facades to access device's state properties in terms of common domain.
// In other words they provide state properties mapping between common domain and vendor device's domain

export interface IDeviceModule<T = DeviceModuleTypeEnum, State = any> {
    readonly type: T;
    readonly name: string;
    readonly title: string;
    readonly description: string;

    getState(): State;
}