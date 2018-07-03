import {AbstractDevice} from "../../../../models/devices/AbstractDevice";
import {DeviceSelector} from "../../../../models/devices/DeviceSelector";
import {DeviceStatusEnum} from "../../../../models/devices/DeviceStatusEnum";

export type DeviceAPIFindCriteriaType = {
    type?: string,
    id?: string,
    status? : DeviceStatusEnum
}

export interface IDeviceAPI<Device extends AbstractDevice = AbstractDevice> {

    find(criteria: DeviceAPIFindCriteriaType): Promise<Device[]>;

    update(device: Device): Promise<void>;
    insert(device: Device): Promise<void>;

    getBySelector(selector: DeviceSelector): Promise<Device>;
}