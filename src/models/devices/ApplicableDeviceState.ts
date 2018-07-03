import {BaseError} from "../../BaseError";
import {PropertyChange} from "./changes/PropertyChange";
import {IDevicePropertiesOptions} from "../../vendors/_abstract/devices/configuration/IDevicePropertiesOptions";
import {AbstractDeviceStateProperty} from "./AbstractDeviceStateProperty";
import {DeviceState} from "./DeviceState";

/**
 * For encapsulated use within Vendors' Devices.
 */
export class ApplicableDeviceState<P extends IDevicePropertiesOptions> extends DeviceState<P> {
    apply(changes: Iterable<PropertyChange>, skipNotMatching: boolean = false) {
        const ownDeviceSelector = this.deviceSelector.toString();
        const newProperties: AbstractDeviceStateProperty<any>[] = [];

        for (const change of changes) {
            try {
                if (change.deviceSelector.toString() !== ownDeviceSelector) {
                    if (skipNotMatching) continue;
                    else throw new BaseError(this, 'Device selector does not match', ownDeviceSelector)
                }

                const name = change.propertyName;
                const currentProperty = this.propertiesMap.get(name);
                if (!currentProperty) {
                    if (skipNotMatching) continue;
                    else throw new BaseError(this, 'No such property in the Device')
                        .addItem('Selector', ownDeviceSelector)
                        .addItem('Property name', name);
                }
                if (currentProperty.valueEquals(change.value)) continue;

                newProperties.push(currentProperty.applyValue(change.value));
            } catch (e) {
                throw new BaseError(this, 'Failed to apply change', change, e)
            }
        }

        // console.log(this.constructor.name, 'new properties', newProperties);

        // Changes list validated and filtered. Now we may proceed to replace changed properties.
        for (const newProperty of newProperties)
            this.propertiesMap.set(newProperty.name, newProperty);
    }
}