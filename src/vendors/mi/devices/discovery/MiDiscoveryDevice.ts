import {IDeviceModule} from "../../../../models/devices/modules/IDeviceModule";
import {NetworkAddressType} from "../../../../resources/NetworkAddressType";
import {DeviceSelector} from "../../../../models/devices/DeviceSelector";
import {MiVendorName, MiVendorType} from "../../MiVendor";
import {MiAbstractDevice} from "../MiAbstractDevice";
import {MiDiscoveryGetSubdevicesMessage} from "./messages/getSubdevices/models/MiDiscoveryGetSubdevicesMessage";
import {MiDiscoveryWhoisRequestMessage} from "./messages/whois/models/MiDiscoveryWhoisRequestMessage";
import {IMiDiscoveryDeviceConfiguration} from "./IMiDiscoveryDeviceConfiguration";

export class MiDiscoveryDevice extends MiAbstractDevice {
    static staticSelector = new DeviceSelector<MiVendorType>(MiVendorName, 'discovery', 'null');

    constructor(protected configuration: IMiDiscoveryDeviceConfiguration) {
        super(MiDiscoveryDevice.staticSelector, configuration)
    }

    protected makeModules(): IDeviceModule[] {
        return [];
    }



    makeWhoisMessage(): MiDiscoveryWhoisRequestMessage {
        return new MiDiscoveryWhoisRequestMessage();
    }
    makeGetSubdevicesMessage(): MiDiscoveryGetSubdevicesMessage {
        return new MiDiscoveryGetSubdevicesMessage();
    }

    getDiscoverAddress(): NetworkAddressType { return this.configuration.addresses.discover; }
    getSubdevicesAddress(): NetworkAddressType { return this.configuration.addresses.getSubdevices; }
}