import {BaseError} from "../../../../../../BaseError";
import {DeviceSelector} from "../../../../../../models/devices/DeviceSelector";
import {DeviceState} from "../../../../../../models/devices/DeviceState";
import {CommonDeviceModuleOptions} from "../../../../../../models/devices/modules/AbstractDeviceModule";
import {
    AbstractBatterySensorModule,
    BatterySensorModuleStateEnum
} from "../../../../../../models/devices/modules/sensors/discreet/AbstractBatterySensorModule";
import {NumericRangeType} from "../../../../../../types";
import {IDevicePropertyNumberOptions} from "../../../../../_abstract/devices/configuration/properties/IDevicePropertyNumberOptions";

export class MiBatterySensorModule extends AbstractBatterySensorModule {
    protected voltageRange: NumericRangeType;

    constructor(
        deviceSelector: DeviceSelector,
        deviceState: DeviceState,
        protected voltagePropertyName: string,
        protected voltagePropertyOptions: IDevicePropertyNumberOptions,
        options: CommonDeviceModuleOptions
    ) {
        super(deviceSelector, deviceState, options);

        this.voltageRange = voltagePropertyOptions.value && voltagePropertyOptions.value.range;

        if (!this.voltageRange || this.voltageRange.min === undefined || this.voltageRange.max === undefined)
            throw new BaseError(this, 'Invalid property options range', this.voltagePropertyOptions);
    }

    getState(): BatterySensorModuleStateEnum {
        const percent = this.getPercent();

        if (percent === undefined) return BatterySensorModuleStateEnum.UNKNOWN;
        if (percent > 80) return BatterySensorModuleStateEnum.FULL;
        if (percent > 50) return BatterySensorModuleStateEnum.NORMAL;
        return BatterySensorModuleStateEnum.EMPTY;
    }

    getPercent(): number {
        const voltage: number = this.deviceState.get(this.voltagePropertyName).getValue();
        if (voltage === undefined) return;

        return Math.round((voltage - this.voltageRange.min) / (this.voltageRange.max - this.voltageRange.min) * 100);
    }

}