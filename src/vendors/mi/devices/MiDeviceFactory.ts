import {BaseError} from "../../../BaseError";
import {DeviceSelector} from "../../../models/devices/DeviceSelector";
import {IMiDevicesConfiguration} from "../configuration/IMiDevicesConfiguration";
import {IDeviceFactory, DeviceFactoryDescription} from "../../_abstract/devices/IDeviceFactory";
import {MiVendorName, MiVendorType} from "../MiVendor";
import {MiAnyDevice} from "./MiAbstractDevice";
import {MiGatewayDevice, MiGatewayDeviceName} from "./gateway/MiGatewayDevice";
import {MiMotionSensorDevice, MiMotionSensorDeviceName} from "./sensors/motion/MiMotionSensorDevice";
import {Mi86sw1SwitchDevice, Mi86sw1SwitchDeviceName} from "./switches/86sw1/Mi86sw1SwitchDevice";

export class MiDeviceFactory implements IDeviceFactory<MiAnyDevice>{
    constructor(protected configuration: IMiDevicesConfiguration) {}

    get(description: DeviceFactoryDescription): MiAnyDevice {
        const selector = <DeviceSelector<MiVendorType>> description.selector;
        if (selector.vendor !== MiVendorName) throw new BaseError(this, 'Device is not supported', description.selector);

        let device: MiAnyDevice;
        switch(selector.type) {
            case MiGatewayDeviceName:
                device = new MiGatewayDevice(
                    selector,
                    this.configuration.gateway,
                    description.stateProperties
                );
                break;

            case MiMotionSensorDeviceName:
                device = new MiMotionSensorDevice(
                    selector,
                    this.configuration.motion,
                    description.stateProperties
                );
                break;

            case Mi86sw1SwitchDeviceName:
                device = new Mi86sw1SwitchDevice(
                    selector,
                    this.configuration["86sw1"],
                    description.stateProperties
                );
                break;

            default:
                throw new BaseError(this, 'Device is not supported', description.selector);
        }

        return device.setStatus(description.status).setLastUpdate(description.lastUpdate);
    }
}