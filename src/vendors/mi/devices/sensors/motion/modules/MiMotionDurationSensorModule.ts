import * as moment from 'moment'

import {DeviceSelector} from "../../../../../../models/devices/DeviceSelector";
import {DeviceState} from "../../../../../../models/devices/DeviceState";
import {AbstractDeviceModule, CommonDeviceModuleOptions} from "../../../../../../models/devices/modules/AbstractDeviceModule";
import {DeviceModuleTypeEnum} from "../../../../../../models/devices/modules/DeviceModuleTypeEnum";
import {SensorTypeEnum} from "../../../../../../models/devices/modules/ISensorDeviceModule";
import {IDiscreetCapableSensorModule} from "../../../../../../models/devices/modules/sensors/IDiscreetCapableSensorModule";

export class MiMotionStateSensorModule
        extends AbstractDeviceModule<DeviceModuleTypeEnum.SENSOR, number>
        implements IDiscreetCapableSensorModule<number> {
    readonly type: DeviceModuleTypeEnum.SENSOR;
    readonly sensorType: SensorTypeEnum.MOTION;

    protected durationEnumeration: number[] = [0, 5, 10, 30, 60, 120, 300, 600, 1200];

    constructor(
        deviceSelector: DeviceSelector,
        deviceState: DeviceState,
        protected lastMotionPropertyName: string,
        options: CommonDeviceModuleOptions
    ) {
        super(deviceSelector, deviceState, options);
    }

    getState(): number {
        const lastMotion: Date = this.deviceState.get(this.lastMotionPropertyName).getValue();
        if (lastMotion === undefined) return;

        const diff = moment().diff(moment(lastMotion))/1000;

        for (const duration of this.durationEnumeration.reverse()){
            if (diff > duration) return duration;
        }

        return;
    }

    getCapabilities(): number[] {
        return this.durationEnumeration;
    }

}