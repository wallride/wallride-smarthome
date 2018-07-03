import {NumericRangeType} from "../../../../types";
import {DeviceModuleTypeEnum} from "../DeviceModuleTypeEnum";
import {SensorTypeEnum} from "../ISensorDeviceModule";
import {AbstractNumericStateSensorModule} from "./AbstractNumericStateSensorModule";

export abstract class AbstractRangedNumericStateSensorModule
            extends AbstractNumericStateSensorModule {
    readonly unit: string;
    readonly type: DeviceModuleTypeEnum.SENSOR;
    abstract readonly sensorType: SensorTypeEnum;


    getCapableRange(): NumericRangeType {
        return (this.propertyOptions.value && this.propertyOptions.value.range) || {}
    }
}