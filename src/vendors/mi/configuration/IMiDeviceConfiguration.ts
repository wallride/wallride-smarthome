import {IDeviceConfiguration} from "../../_abstract/devices/configuration/IDeviceConfiguration";
import {IDevicePropertiesOptions} from "../../_abstract/devices/configuration/IDevicePropertiesOptions";

export interface IMiDeviceConfiguration<P extends IDevicePropertiesOptions = IDevicePropertiesOptions|undefined> extends IDeviceConfiguration<P>  {
}