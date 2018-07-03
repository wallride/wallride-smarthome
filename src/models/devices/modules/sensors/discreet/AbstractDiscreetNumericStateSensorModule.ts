import {DeviceModuleTypeEnum} from "../../DeviceModuleTypeEnum";
import {SensorTypeEnum} from "../../ISensorDeviceModule";
import {AbstractNumericStateSensorModule} from "../AbstractNumericStateSensorModule";
import {IDiscreetCapableSensorModule} from "../IDiscreetCapableSensorModule";

export abstract class AbstractDiscreetNumericStateSensorModule
            extends AbstractNumericStateSensorModule
            implements IDiscreetCapableSensorModule<number> {
    readonly unit: string;
    readonly type: DeviceModuleTypeEnum.SENSOR;
    abstract readonly sensorType: SensorTypeEnum;

    getCapabilities(): number[] {
        return (this.propertyOptions.value && this.propertyOptions.value.enumeration) || [];
    }

    /**
     * may be overridden
     */
    getTitles(): string[] {
        const result = [];
        for (const n of this.getCapabilities()) result.push(n.toString(10) + ' ' + this.unit);

        return result;
    }

}