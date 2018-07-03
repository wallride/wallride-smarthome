import {NetworkAddressType} from "../../../../resources/NetworkAddressType";
import {IMiDeviceConfiguration} from "../../configuration/IMiDeviceConfiguration";

export interface IMiDiscoveryDeviceConfiguration extends IMiDeviceConfiguration {
    name: 'discovery',

    addresses: {
        discover: NetworkAddressType
        getSubdevices: NetworkAddressType
    }
}