import {IDevicePropertiesOptions} from "./IDevicePropertiesOptions";

export interface IDeviceConfiguration<Properties extends IDevicePropertiesOptions = IDevicePropertiesOptions|undefined>  {
    name: string;
    properties?: Properties
}
