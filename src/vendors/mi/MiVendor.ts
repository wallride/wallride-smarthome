import * as di from "@ips.su/di";

import {AbstractVendor} from "../_abstract/AbstractVendor";
import {IMiVendorConfiguration} from "./configuration/IMiVendorConfiguration";
import {MiVendorDependency} from "./MiVendorDependency";

export type MiVendorType = 'mi';
export const MiVendorName: MiVendorType = 'mi';

export class MiVendor extends AbstractVendor implements di.Dependable<MiVendorDependency> {
    protected dependency: MiVendorDependency;
    injectDependency(dependency: MiVendorDependency): this {this.dependency = dependency; return this; }
    getDependency(): MiVendorDependency {return this.dependency}

    readonly name = MiVendorName;

    constructor(protected configuration: IMiVendorConfiguration) { super(configuration)}

    protected async refreshDevices(): Promise<void> {
        const {deviceProvider, messageSender} = this.getDependency();

        const discoveryDevice = await deviceProvider.getDiscoveryDevice();
        await messageSender.send(
            discoveryDevice.makeWhoisMessage(),
            discoveryDevice.getDiscoverAddress()
        );

    }

    async setup(): Promise<void> {
        await this.getDependency().messageProvider.setup();
        await this.refreshDevices();
    }

}