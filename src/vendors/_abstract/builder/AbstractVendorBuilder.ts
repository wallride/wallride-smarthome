import * as di from '@ips.su/di'


import {AbstractVendor} from "../AbstractVendor";
import {IVendorConfiguration} from "../configuration/IVendorConfiguration";
import {AbstractDevice} from "../../../models/devices/AbstractDevice";
import {IDeviceAPI} from "../devices/api/IDeviceAPI";
import {IDeviceFactory} from "../devices/IDeviceFactory";
import {IDeviceProvider} from "../providers/IDeviceProvider";
import {ITransport, ITransportPacket} from "../transport/ITransport";

export abstract class AbstractVendorBuilder<Vendor extends AbstractVendor, Device extends AbstractDevice>
            extends di.AbstractBuilder<Vendor> {
    vendor: di.AbstractBean<Vendor>;
    deviceProvider: di.AbstractBean<IDeviceProvider<Device>>;
    transport: di.AbstractBean<ITransport<ITransportPacket>>;
    deviceFactory: di.AbstractBean<IDeviceFactory<Device>>;
    deviceAPI: di.AbstractBean<IDeviceAPI<Device>>;

    protected constructor(configuration: IVendorConfiguration) {
        super();
    }


    protected getTargetBean(): di.AbstractBean<Vendor> {
        return this.vendor;
    }

}