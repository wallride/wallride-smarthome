import {IDevicePropertiesOptions} from "../../../../../_abstract/devices/configuration/IDevicePropertiesOptions";
import {IDevicePropertyNumberOptions} from "../../../../../_abstract/devices/configuration/properties/IDevicePropertyNumberOptions";
import {IDevicePropertyStringOptions} from "../../../../../_abstract/devices/configuration/properties/IDevicePropertyStringOptions";

export type Mi86sw1SwitchDevicePropertiesOptionsType = IDevicePropertiesOptions & {
    voltage: IDevicePropertyNumberOptions,
    lastEvent: IDevicePropertyStringOptions,
}