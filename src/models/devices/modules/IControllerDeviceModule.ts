import {IModuleAction} from "../../communication/IModuleAction";
import {DeviceModuleTypeEnum} from "./DeviceModuleTypeEnum";
import {IDeviceModule} from "./IDeviceModule";

export interface IControllerDeviceModule<S> extends IDeviceModule<DeviceModuleTypeEnum.CONTROLLER, S> {
    trigger(state: S): IModuleAction<S>; // Make the unit fire an event (virtually or physically)
}