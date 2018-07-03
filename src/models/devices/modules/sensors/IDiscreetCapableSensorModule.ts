import {ISensorDeviceModule} from "../ISensorDeviceModule";

export interface IDiscreetCapableSensorModule<T> extends ISensorDeviceModule<T> {
    getCapabilities(): T[]
}