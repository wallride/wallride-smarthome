import {DeviceModuleTypeEnum} from "./DeviceModuleTypeEnum";
import {IDeviceModule} from "./IDeviceModule";

export enum SensorTypeEnum {
    MOTION = 'motion',
    TEMPERATURE = 'temperature',
    BATTERY = 'battery',
    HUMIDITY = 'humidity',
    LUMINOSITY = 'luminosity',
    LEAK = 'leak',
    CLOSURE = 'closure',

}

export interface ISensorDeviceModule<S = any> extends IDeviceModule<DeviceModuleTypeEnum.SENSOR, S> {
    readonly sensorType: SensorTypeEnum
}