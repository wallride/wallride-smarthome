import {BaseError} from "../../../BaseError";
import {IDevicePropertiesOptions} from "../../_abstract/devices/configuration/IDevicePropertiesOptions";
import {DeviceSelector} from "../../../models/devices/DeviceSelector";
import {MiGatewayDeviceType} from "./gateway/MiGatewayDevice";
import {MiVendorType} from "../MiVendor";
import {MiAbstractDevice} from "./MiAbstractDevice";

export abstract class MiAbstractSubdevice<P extends IDevicePropertiesOptions> extends MiAbstractDevice<P> {
    protected gatewaySelector: DeviceSelector<MiVendorType, MiGatewayDeviceType>;

    setGateway(gatewaySelector: DeviceSelector<MiVendorType, MiGatewayDeviceType>): this {
        if (this.gatewaySelector) throw new BaseError(this, 'Gateway selector has been already set', this.gatewaySelector);

        this.gatewaySelector = gatewaySelector;

        return this;
    }
}