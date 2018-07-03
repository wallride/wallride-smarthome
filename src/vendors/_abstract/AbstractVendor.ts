import * as di from '@ips.su/di'

import {IVendorConfiguration} from "./configuration/IVendorConfiguration";
import {VendorDependency} from "./VendorDependency";

export abstract class AbstractVendor implements di.Dependable<VendorDependency> {
    protected dependency: VendorDependency;
    injectDependency(dependency: VendorDependency): this {this.dependency = dependency; return this; }
    getDependency(): VendorDependency {return this.dependency}

    abstract readonly name: string;

    protected constructor(protected configuration: IVendorConfiguration) {}

    abstract setup(): Promise<void>;
    protected abstract refreshDevices(): Promise<void>
}