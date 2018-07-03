import {AbstractDevice} from "../AbstractDevice";
import {DeviceSelector} from "../DeviceSelector";
import {DeviceState} from "../DeviceState";
import {DeviceModuleTypeEnum} from "./DeviceModuleTypeEnum";
import {IDeviceModule} from "./IDeviceModule";

export type CommonDeviceModuleOptions = {
    name: string,
    title: string,
    description?: string
}

export abstract class AbstractDeviceModule<T extends DeviceModuleTypeEnum, State> implements IDeviceModule<T, State> {
    abstract readonly type: T;

    protected constructor(
        protected deviceSelector: DeviceSelector,
        protected deviceState: DeviceState,
        protected options: CommonDeviceModuleOptions
    ) {}

    get name(): string {return this.options.name}
    get title(): string {return this.options.title}
    get description(): string {return this.options.description || ''}

    abstract getState(): State;
}