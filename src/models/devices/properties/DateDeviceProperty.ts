import {IDevicePropertyDateOptions} from "../../../vendors/_abstract/devices/configuration/properties/IDevicePropertyDateOptions";
import {AbstractDeviceStateProperty} from "../AbstractDeviceStateProperty";
import {DeviceSelector} from "../DeviceSelector";

export class DateDeviceProperty extends AbstractDeviceStateProperty<Date> {
    constructor(
        deviceSelector: DeviceSelector,
        protected options: IDevicePropertyDateOptions,
        name: string,
        value?: Date
    ) {
        super(deviceSelector, options, name, value)
    }

    validateValue(value: Date): void {
        //@todo make validation
    }

    valueEquals(value: Date): boolean {
        return (this.getValue() ? this.getValue().toISOString() : 'undefined') === (value ? value.toISOString() : 'undefined');
    }


}