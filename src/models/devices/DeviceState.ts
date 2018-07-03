import {BaseError} from "../../BaseError";
import {IDevicePropertiesOptions} from "../../vendors/_abstract/devices/configuration/IDevicePropertiesOptions";
import {PrimitiveTypeEnum} from "../primitives/options/PrimitiveTypeEnum";
import {AbstractDeviceStateProperty} from "./AbstractDeviceStateProperty";
import {DeviceSelector} from "./DeviceSelector";
import {DateDeviceProperty} from "./properties/DateDeviceProperty";
import {NumberDeviceProperty} from "./properties/NumberDeviceProperty";
import {StringDeviceProperty} from "./properties/StringDeviceProperty";

export type DevicePropertyKeyType<P extends IDevicePropertiesOptions> = (keyof P) & string;

export class DeviceState<P extends IDevicePropertiesOptions = IDevicePropertiesOptions> {
    protected propertiesMap = new Map<DevicePropertyKeyType<P>, AbstractDeviceStateProperty>();

    constructor(protected deviceSelector: DeviceSelector, protected options: P, values: Object = {}) {
        for (const key of Object.keys(this.options)){
            const propertyOptions = this.options[key];

            let property: AbstractDeviceStateProperty;
            switch (propertyOptions.type) {
                case PrimitiveTypeEnum.NUMBER:
                    property = new NumberDeviceProperty(deviceSelector, propertyOptions, key, values[key]); break;
                case PrimitiveTypeEnum.STRING:
                    property = new StringDeviceProperty(deviceSelector, propertyOptions, key, values[key]); break;
                case PrimitiveTypeEnum.DATE:
                    property = new DateDeviceProperty(deviceSelector, propertyOptions, key, values[key]); break;

                default: throw new BaseError(this, 'Device property type is not supported', propertyOptions.type);
            }

            this.propertiesMap.set(key, property);
        }
    }

    getValuesObject(): Object {
        const result = {};
        for (const [key, prop] of this.propertiesMap){
            const value = prop.getValue();
            if (value !== undefined) result[<string> key] = value;
        }

        return result;
    }

    get<S = any>(name: DevicePropertyKeyType<P>): AbstractDeviceStateProperty<S> {
        const result = this.propertiesMap.get(name);
        if (!result) throw new BaseError(this, 'No property with that name', name);

        return result;
    }

}