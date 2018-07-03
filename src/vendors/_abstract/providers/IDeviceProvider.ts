import {AbstractDevice} from "../../../models/devices/AbstractDevice";
import {DeviceSelector} from "../../../models/devices/DeviceSelector";

export interface IDeviceProvider<D extends AbstractDevice> {
    has(selector: DeviceSelector): boolean;
    get(selector: DeviceSelector): Promise<D>
    getAll(): Promise<D[]>

}