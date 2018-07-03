import {DeviceSelector} from "../devices/DeviceSelector";

/**
 * Describes a "device -> coordinator" notification containing names of modules that have been changed
 */
export interface IDeviceNotification {
    deviceSelector: DeviceSelector,
    modules: string[]
}