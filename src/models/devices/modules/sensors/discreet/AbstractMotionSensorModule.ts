import {AbstractDeviceModule} from "../../AbstractDeviceModule";
import {DeviceModuleTypeEnum} from "../../DeviceModuleTypeEnum";
import {SensorTypeEnum} from "../../ISensorDeviceModule";
import {IDiscreetCapableSensorModule} from "../IDiscreetCapableSensorModule";

export enum MotionSensorModuleStateEnum {
    MOTION = 'motion',
    IDLE = 'idle',
}

export abstract class AbstractMotionSensorModule
            extends AbstractDeviceModule<DeviceModuleTypeEnum.SENSOR, MotionSensorModuleStateEnum>
            implements IDiscreetCapableSensorModule<MotionSensorModuleStateEnum> {
    readonly type: DeviceModuleTypeEnum.SENSOR;
    readonly sensorType = SensorTypeEnum.MOTION;

    protected capability: MotionSensorModuleStateEnum[] = [
        MotionSensorModuleStateEnum.MOTION,
        MotionSensorModuleStateEnum.IDLE,
    ];

    getCapabilities(): MotionSensorModuleStateEnum[] { return this.capability; }
}