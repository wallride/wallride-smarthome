import {IDevicePropertiesOptions} from "../../../../../_abstract/devices/configuration/IDevicePropertiesOptions";
import {IDevicePropertyDateOptions} from "../../../../../_abstract/devices/configuration/properties/IDevicePropertyDateOptions";
import {IDevicePropertyNumberOptions} from "../../../../../_abstract/devices/configuration/properties/IDevicePropertyNumberOptions";

export type MiMotionSensorDevicePropertiesOptionsType = IDevicePropertiesOptions & {
    voltage: IDevicePropertyNumberOptions,
    lastMotion: IDevicePropertyDateOptions
}