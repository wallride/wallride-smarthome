import {IDevicePropertiesOptions} from "../../../../_abstract/devices/configuration/IDevicePropertiesOptions";
import {IDevicePropertyNumberOptions} from "../../../../_abstract/devices/configuration/properties/IDevicePropertyNumberOptions";
import {IDevicePropertyStringOptions} from "../../../../_abstract/devices/configuration/properties/IDevicePropertyStringOptions";

export type GatewayDevicePropertiesOptionsType = IDevicePropertiesOptions & {
    protoVersion: IDevicePropertyStringOptions,
    token: IDevicePropertyStringOptions,
    key: IDevicePropertyStringOptions,
    ip: IDevicePropertyStringOptions,
    port: IDevicePropertyNumberOptions,

    password: IDevicePropertyStringOptions,
}