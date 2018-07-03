import {IDevicePropertyOptions} from "../../../../vendors/_abstract/devices/configuration/properties/IDevicePropertyOptions";
import {PrimitiveTypeEnum} from "../../../primitives/options/PrimitiveTypeEnum";
import {INumberPrimitiveOptions} from "../../../primitives/options/values/INumberPrimitiveOptions";
import {DeviceSelector} from "../../DeviceSelector";
import {DeviceState} from "../../DeviceState";
import {AbstractDeviceModule, CommonDeviceModuleOptions} from "../AbstractDeviceModule";
import {DeviceModuleTypeEnum} from "../DeviceModuleTypeEnum";
import {ISensorDeviceModule, SensorTypeEnum} from "../ISensorDeviceModule";

export abstract class AbstractNumericStateSensorModule
            extends AbstractDeviceModule<DeviceModuleTypeEnum.SENSOR, number>
            implements ISensorDeviceModule<number> {
    readonly unit: string;
    readonly type: DeviceModuleTypeEnum.SENSOR;
    abstract readonly sensorType: SensorTypeEnum;

    constructor(
        deviceSelector: DeviceSelector,
        deviceState: DeviceState,
        protected propertyName: string,
        protected propertyOptions: IDevicePropertyOptions<PrimitiveTypeEnum.NUMBER> & INumberPrimitiveOptions,
        protected options: CommonDeviceModuleOptions & {unit: string}
    ) {
        super(deviceSelector, deviceState, options);

        this.unit = this.options.unit;
    }

    getState(): number {
        return this.deviceState.get(this.propertyName).getValue();
    }

}