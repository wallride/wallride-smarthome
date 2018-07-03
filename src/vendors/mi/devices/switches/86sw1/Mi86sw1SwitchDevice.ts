import {DeviceSelector} from "../../../../../models/devices/DeviceSelector";
import {MiVendorType} from "../../../MiVendor";
import {MiAbstractDevice} from "../../MiAbstractDevice";
import {Mi86sw1SwitchDevicePropertiesOptionsType} from "./configuration/Mi86sw1SwitchDevicePropertiesOptionsType";
import {Mi86sw1SwitchDeviceConfigurationType} from "./configuration/Mi86sw1SwitchDeviceConfigurationType";

export type Mi86sw1SwitchDeviceType = '86sw1';
export const Mi86sw1SwitchDeviceName: Mi86sw1SwitchDeviceType = '86sw1';

export class Mi86sw1SwitchDevice extends MiAbstractDevice<Mi86sw1SwitchDevicePropertiesOptionsType> {
    constructor(selector: DeviceSelector<MiVendorType>, protected configuration: Mi86sw1SwitchDeviceConfigurationType, state?: Object) {
        super(selector, configuration, state)
    }
}