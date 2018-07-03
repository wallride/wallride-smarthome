import {DeviceSelector} from "../../../../../models/devices/DeviceSelector";
import {IDeviceModule} from "../../../../../models/devices/modules/IDeviceModule";
import {MiVendorType} from "../../../MiVendor";
import {MiBatterySensorModule} from "../../common/modules/sensors/MiBatterySensorModule";
import {MiAbstractDevice} from "../../MiAbstractDevice";
import {MiMotionSensorDevicePropertiesOptionsType} from "./configuration/MiMotionSensorDevicePropertiesOptionsType";
import {MiMotionSensorDeviceConfigurationType} from "./configuration/MiMotionSensorDeviceConfigurationType";
import {MiMotionStateSensorModule} from "./modules/MiMotionDurationSensorModule";

export type MiMotionSensorDeviceType = 'motion';
export const MiMotionSensorDeviceName: MiMotionSensorDeviceType = 'motion';

export class MiMotionSensorDevice extends MiAbstractDevice<MiMotionSensorDevicePropertiesOptionsType> {
    constructor(selector: DeviceSelector<MiVendorType>, protected configuration: MiMotionSensorDeviceConfigurationType, state?: Object) {
        super(selector, configuration, state)
    }

    protected makeModules(): IDeviceModule[] {
        const state = this.getState();
        return [
            new MiBatterySensorModule(
                this.selector, state,
                'voltage',
                this.configuration.properties.voltage,
                {name: 'battery', title: 'Battery level'}
            ),
            new MiMotionStateSensorModule(
                this.selector, state,
                'lastMotion',
                {name: 'duration', title: 'Idle duration'}
            ),
            new MiMotionStateSensorModule(
                this.selector, state,
                'lastMotion',
                {name: 'state', title: 'Motion state'}
            ),
        ];
    }



}