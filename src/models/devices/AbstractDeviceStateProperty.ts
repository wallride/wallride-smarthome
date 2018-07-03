import {BaseError} from "../../BaseError";
import {IPrimitiveOptions} from "../primitives/options/IPrimitiveOptions";
import {PropertyChange} from "./changes/PropertyChange";
import {IDevicePropertyOptions} from "../../vendors/_abstract/devices/configuration/properties/IDevicePropertyOptions";
import {PrimitiveTypeEnum} from "../primitives/options/PrimitiveTypeEnum";
import {DeviceSelector} from "./DeviceSelector";

/**
 * Property is immutable, so external components (outside the device) cannot modify the value
 */
export abstract class AbstractDeviceStateProperty<V = any> {
    protected constructor (
        public readonly deviceSelector: DeviceSelector,
        protected options: IDevicePropertyOptions & IPrimitiveOptions,
        public readonly name: string,
        protected value?: V
    ) {
        // don't validate empties on creation.
        if (value !== undefined) this.validateValue(value);
    }

    getValue(): V { return this.value; }

    changeValue(value: V): PropertyChange<V> {
        this.validateValue(value);

        return new PropertyChange<V>(this.deviceSelector, this.name, value);
    }

    abstract validateValue(value: V): void;


    /**
     * Sets new value and returns a ne Property object
     * @param value
     */
    applyValue(value: V): this {
        this.validateValue(value);

        // Dirty instance cloning :(
        const newInstance = Object.create(this);
        newInstance['deviceSelector'] = this.deviceSelector;
        newInstance['options'] = this.options;
        newInstance['name'] = this.name;
        newInstance['value'] = value;

        return newInstance;
    }

    /**
     * Should be overridden for non-scalar types like Buffer, Date, etc
     * @param value
     */
    valueEquals(value: V): boolean {
        if (typeof value === 'object') throw new BaseError(this, 'Base method .valueEquals() supports only scalar values (strings, numbers, boolean, etc)', value);

        return this.getValue() === value;
    }

    getType(): PrimitiveTypeEnum { return this.options.type; }
}