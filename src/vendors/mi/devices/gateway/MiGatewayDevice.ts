import {DeviceSelector} from "../../../../models/devices/DeviceSelector";
import {IDeviceModule} from "../../../../models/devices/modules/IDeviceModule";
import {MiVendorType} from "../../MiVendor";
import {MiAbstractDevice} from "../MiAbstractDevice";
import {GatewayDevicePropertiesOptionsType} from "./configuration/GatewayDevicePropertiesOptionsType";
import {MiGatewayDeviceConfigurationType} from "./configuration/MiGatewayDeviceConfigurationType";

export type MiGatewayDeviceType = 'gateway';
export const MiGatewayDeviceName: MiGatewayDeviceType = 'gateway';

export class MiGatewayDevice extends MiAbstractDevice<GatewayDevicePropertiesOptionsType> {
    constructor(selector: DeviceSelector<MiVendorType>, protected configuration: MiGatewayDeviceConfigurationType, state?: Object) {
        super(selector, configuration, state)
    }

    protected makeModules(): IDeviceModule[] {
        return [
            new DevMo
        ];
    }


    getPassword(): string|undefined {
        return this.getState().get('password').getValue();
    }

}