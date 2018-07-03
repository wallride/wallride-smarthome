import {IModuleAction} from "../../communication/IModuleAction";
import {DeviceModuleTypeEnum} from "./DeviceModuleTypeEnum";
import {IDeviceModule} from "./IDeviceModule";

export interface IConfigurableDeviceModule<State> extends IDeviceModule<DeviceModuleTypeEnum.CONFIGURABLE, State> {
    setState(state: State): IModuleAction<State>;
}