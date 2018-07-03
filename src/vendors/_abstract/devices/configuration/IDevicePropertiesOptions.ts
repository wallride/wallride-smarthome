import {IDevicePropertyBooleanOptions} from "./properties/IDevicePropertyBooleanOptions";
import {IDevicePropertyDateOptions} from "./properties/IDevicePropertyDateOptions";
import {IDevicePropertyNumberOptions} from "./properties/IDevicePropertyNumberOptions";
import {IDevicePropertyNumberPercentOptions} from "./properties/IDevicePropertyNumberPercentOptions";
import {IDevicePropertyStringOptions} from "./properties/IDevicePropertyStringOptions";

export interface IDevicePropertiesOptions {
    [index: string]: IDevicePropertyBooleanOptions|IDevicePropertyStringOptions|IDevicePropertyNumberOptions|IDevicePropertyNumberPercentOptions|IDevicePropertyDateOptions;

    customName: IDevicePropertyStringOptions
}