import {AbstractDeviceModule} from "../../AbstractDeviceModule";
import {DeviceModuleTypeEnum} from "../../DeviceModuleTypeEnum";
import {SensorTypeEnum} from "../../ISensorDeviceModule";
import {IDiscreetCapableSensorModule} from "../IDiscreetCapableSensorModule";

export enum BatterySensorModuleStateEnum {
    FULL = 'full',
    EMPTY = 'empty',
    NORMAL = 'normal',
    UNKNOWN = 'unknown',
}

export abstract class AbstractBatterySensorModule
            extends AbstractDeviceModule<DeviceModuleTypeEnum.SENSOR, BatterySensorModuleStateEnum>
            implements IDiscreetCapableSensorModule<BatterySensorModuleStateEnum> {
    readonly type: DeviceModuleTypeEnum.SENSOR;
    readonly sensorType = SensorTypeEnum.BATTERY;

    getCapabilities(): BatterySensorModuleStateEnum[] {
        return [
            BatterySensorModuleStateEnum.EMPTY,
            BatterySensorModuleStateEnum.FULL,
            BatterySensorModuleStateEnum.NORMAL,
            BatterySensorModuleStateEnum.UNKNOWN,
        ]
    }
    abstract getPercent(): number;
}