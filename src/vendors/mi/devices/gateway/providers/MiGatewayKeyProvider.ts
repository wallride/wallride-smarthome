import * as di from '@ips.su/di'
import * as crypto from "crypto";

import {BaseError} from "../../../../../BaseError";
import {DeviceSelector} from "../../../../../models/devices/DeviceSelector";
import {MiGatewayDevice, MiGatewayDeviceType} from "../MiGatewayDevice";
import {MiVendorType} from "../../../MiVendor";
import {MiGatewayKeyProviderDependency} from "./MiGatewayKeyProviderDependency";

const AQARA_IV = Buffer.from([0x17, 0x99, 0x6d, 0x09, 0x3d, 0x28, 0xdd, 0xb3, 0xba, 0x69, 0x5a, 0x2e, 0x6f, 0x58, 0x56, 0x2e]);

function encrypt(token: string, password: string): string {
    const cipher = crypto.createCipheriv('aes-128-cbc', password, AQARA_IV);
    return cipher.update(token, 'ascii', 'hex')
}


export class MiGatewayKeyProvider implements di.Dependable<MiGatewayKeyProviderDependency> {
    protected dependency: MiGatewayKeyProviderDependency;
    getDependency(): MiGatewayKeyProviderDependency {return this.dependency}
    injectDependency(dependency: MiGatewayKeyProviderDependency): this {this.dependency = dependency; return this;}

    protected tokens = new Map<string, string>(); // selector.toString() => token

    updateToken(selector: DeviceSelector<MiVendorType, MiGatewayDeviceType>, token: string): this {
        this.tokens.set(selector.toString(), token);

        return this;
    }

    protected async getGateway(selector: DeviceSelector<MiVendorType, MiGatewayDeviceType>): Promise<MiGatewayDevice> {
        const {deviceProvider} = this.getDependency();

        const gateway = await deviceProvider.get(selector);
        if (!(gateway instanceof MiGatewayDevice)) throw new BaseError(this, 'Not a gateway', selector);

        return gateway;
    }

    async hasKey(selector: DeviceSelector<MiVendorType, MiGatewayDeviceType>): Promise<boolean> {
        const {deviceProvider} = this.getDependency();

        if (!this.tokens.has(selector.toString())) return false;
        if (!deviceProvider.has(selector)) return false;

        const gateway = await this.getGateway(selector);
        const password = gateway.getPassword();

        return !!(password && password.length)
    }

    async getKey(selector: DeviceSelector<MiVendorType, MiGatewayDeviceType>): Promise<string> {
        if (!this.hasKey(selector))
            throw new BaseError(this, 'Cannot get Key due to gatewayDevice has no password or token')
                .addItem('Selector', selector);

        const gateway = await this.getGateway(selector);

        return encrypt(this.tokens.get(selector.toString()), gateway.getPassword());
    }
}