import {MiGatewayDeviceConfigurationType} from "../devices/gateway/configuration/MiGatewayDeviceConfigurationType";
import {IMiDiscoveryDeviceConfiguration} from "../devices/discovery/IMiDiscoveryDeviceConfiguration";
import {MiMotionSensorDeviceConfigurationType} from "../devices/sensors/motion/configuration/MiMotionSensorDeviceConfigurationType";
import {Mi86sw1SwitchDeviceConfigurationType} from "../devices/switches/86sw1/configuration/Mi86sw1SwitchDeviceConfigurationType";

export interface IMiDevicesConfiguration {
    discovery: IMiDiscoveryDeviceConfiguration
    gateway: MiGatewayDeviceConfigurationType
    motion: MiMotionSensorDeviceConfigurationType
    "86sw1": Mi86sw1SwitchDeviceConfigurationType
}