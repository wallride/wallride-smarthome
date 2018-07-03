import {BaseError} from "../../../BaseError";
import {PropertyChange} from "../../../models/devices/changes/PropertyChange";
import {IDevicePropertiesOptions} from "../../_abstract/devices/configuration/IDevicePropertiesOptions";
import {AbstractDevice} from "../../../models/devices/AbstractDevice";
import {ApplicableDeviceState} from "../../../models/devices/ApplicableDeviceState";
import {DeviceSelector} from "../../../models/devices/DeviceSelector";
import {DeviceStatusEnum} from "../../../models/devices/DeviceStatusEnum";
import {IMiDeviceConfiguration} from "../configuration/IMiDeviceConfiguration";
import {MiVendorType} from "../MiVendor";

export type MiAnyDevice = MiAbstractDevice<IDevicePropertiesOptions>;

export abstract class MiAbstractDevice<P extends IDevicePropertiesOptions|undefined = IDevicePropertiesOptions|undefined>
            extends AbstractDevice {
    protected state: ApplicableDeviceState<P>;
    public lastUpdate: Date;

    protected constructor(selector: DeviceSelector<MiVendorType>, protected configuration: IMiDeviceConfiguration<P>, stateValues?: Object) {
        super(selector);

        if (this.configuration.properties)
            this.state = new ApplicableDeviceState<P>(this.selector, this.configuration.properties, stateValues)
    }

    getState(): ApplicableDeviceState<P> {
        if (!this.state)
            throw new BaseError(this, 'Properties are not supported for the device')
                .addItem('Selector', this.selector.toString())
                .addItem('Properties section in config', this.configuration.properties);

        return this.state;
    }

    changeState(stateProperties: Object): PropertyChange[] {
        const state = this.getState();
        const changes: PropertyChange[] = [];

        for(const name in stateProperties){
            try{
                const property = state.get(name);
                if (!property.valueEquals(stateProperties[name])) changes.push(property.changeValue(stateProperties[name]));
            } catch (e) {
                throw new BaseError(this, 'Failed to make change').addItem('Object property name', name)
            }
        }

        return changes;
    }


    setStatus(state: DeviceStatusEnum): this  {
        this.status = state;
        return this;
    }

    setLastUpdate(date: Date): this  {
        this.lastUpdate = date;
        return this;
    }
}