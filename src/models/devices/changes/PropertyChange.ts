import {DeviceSelector} from "../DeviceSelector";

export class PropertyChange<T = any> {
    constructor(public deviceSelector: DeviceSelector, public propertyName: string, public value: T) {}
}