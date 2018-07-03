import {IModuleAction} from "../../communication/IModuleAction";
import {DeviceModuleTypeEnum} from "./DeviceModuleTypeEnum";
import {IDeviceModule} from "./IDeviceModule";

export interface IControllableDeviceModule<State> extends IDeviceModule<DeviceModuleTypeEnum.CONTROLLABLE, State> {
    setState(state: State): IModuleAction<State>;
}