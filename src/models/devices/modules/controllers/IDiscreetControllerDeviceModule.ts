import {IControllerDeviceModule} from "../IControllerDeviceModule";

export interface IDiscreetControllerDeviceModule<S> extends IControllerDeviceModule<S> {
    getCapabilities(): S[];
    isCapable(state: S): boolean;
}