import {IDevicePropertyStringOptions} from "../../../vendors/_abstract/devices/configuration/properties/IDevicePropertyStringOptions";
import {AbstractDeviceStateProperty} from "../AbstractDeviceStateProperty";
import {DeviceSelector} from "../DeviceSelector";

export class StringDeviceProperty extends AbstractDeviceStateProperty<string> {
    constructor(
        deviceSelector: DeviceSelector,
        protected options: IDevicePropertyStringOptions,
        name: string,
        value?: string
    ) {
        super(deviceSelector, options, name, value)
    }

    validateValue(value: string): void {
        //@todo make validation
    }

}