import * as moment from 'moment'
import {BaseError} from "../../../../../../BaseError";

import {DeviceSelector} from "../../../../../../models/devices/DeviceSelector";
import {DeviceState} from "../../../../../../models/devices/DeviceState";
import {CommonDeviceModuleOptions} from "../../../../../../models/devices/modules/AbstractDeviceModule";
import {
    AbstractMotionSensorModule,
    MotionSensorModuleStateEnum
} from "../../../../../../models/devices/modules/sensors/discreet/AbstractMotionSensorModule";
import {IDevicePropertyNumberOptions} from "../../../../../_abstract/devices/configuration/properties/IDevicePropertyNumberOptions";

export class MiMotionStateSensorModule extends AbstractMotionSensorModule {
    protected durationEnumeration: number[];

    constructor(
        deviceSelector: DeviceSelector,
        deviceState: DeviceState,
        protected lastMotionPropertyName: string,
        protected lastMotionPropertyOptions: IDevicePropertyNumberOptions,
        options: CommonDeviceModuleOptions
    ) {
        super(deviceSelector, deviceState, options);

        this.durationEnumeration = lastMotionPropertyOptions && lastMotionPropertyOptions.value && lastMotionPropertyOptions.value.enumeration;
        if (!this.durationEnumeration || !this.durationEnumeration.length)
            throw new BaseError(this, 'Invalid property options enumeration', this.lastMotionPropertyOptions);

        this.durationEnumeration = this.durationEnumeration.sort((a, b) => {return b<a ? 1 : -1})
    }

    getState(): MotionSensorModuleStateEnum {
        const lastMotion: Date = this.deviceState.get(this.lastMotionPropertyName).getValue();
        if (lastMotion === undefined) return MotionSensorModuleStateEnum.IDLE;

        const diff = moment().diff(moment(lastMotion))/1000;

        return diff < 1 ? MotionSensorModuleStateEnum.MOTION : MotionSensorModuleStateEnum.IDLE;


        // for (const duration of this.durationEnumeration){
        //     if (duration)
        // }
    }
}