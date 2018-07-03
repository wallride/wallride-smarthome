import {IDevicePropertyNumberOptions} from "../../../vendors/_abstract/devices/configuration/properties/IDevicePropertyNumberOptions";
import {IDevicePropertyNumberPercentOptions} from "../../../vendors/_abstract/devices/configuration/properties/IDevicePropertyNumberPercentOptions";
import {AbstractDevice} from "../AbstractDevice";
import {AbstractDeviceStateProperty} from "../AbstractDeviceStateProperty";
import {DeviceSelector} from "../DeviceSelector";

export class NumberDeviceProperty extends AbstractDeviceStateProperty<number> {
    constructor(
        deviceSelector: DeviceSelector,
        protected options: IDevicePropertyNumberOptions | IDevicePropertyNumberPercentOptions,
        name: string,
        value?: number
    ) {
        super(deviceSelector, options, name, value)
    }

    validateValue(value: number): void {
        //@todo make validation
    }

}