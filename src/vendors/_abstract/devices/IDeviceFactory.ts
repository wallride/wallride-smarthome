import {AbstractDevice} from "../../../models/devices/AbstractDevice";
import {DeviceSelector} from "../../../models/devices/DeviceSelector";
import {DeviceStatusEnum} from "../../../models/devices/DeviceStatusEnum";

export type DeviceFactoryDescription = {
    selector: DeviceSelector
    status: DeviceStatusEnum,
    lastUpdate: Date,
    stateProperties?: Object
}

export interface IDeviceFactory<D extends AbstractDevice = AbstractDevice> {
    get(description: DeviceFactoryDescription): D;
}