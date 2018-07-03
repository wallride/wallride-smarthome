import * as di from '@ips.su/di'

import {BaseError} from "../../../../../BaseError";
import {MongoCollectionResource} from "../../../../../resources/db/mongo/MongoCollectionResource";
import {AbstractDevice} from "../../../../../models/devices/AbstractDevice";
import {DeviceSelector} from "../../../../../models/devices/DeviceSelector";
import {DeviceStatusEnum} from "../../../../../models/devices/DeviceStatusEnum";
import {DevicesAPIDependency} from "../DevicesAPIDependency";
import {DeviceAPIFindCriteriaType, IDeviceAPI} from "../IDeviceAPI";

export type IMongoDeviceSchema<Vendor = string> = {
    vendor: Vendor, type: string, id: string,
    status: DeviceStatusEnum,
    lastUpdate: Date;
    state?: Object;
}


export class MongoDevicesAPI<Device extends AbstractDevice = AbstractDevice>
            implements  IDeviceAPI<Device>,
                        di.Dependable<DevicesAPIDependency<Device>>{
    protected dependency: DevicesAPIDependency<Device>;
    getDependency(): DevicesAPIDependency<Device> { return this.dependency; }
    injectDependency(dependency: DevicesAPIDependency<Device>): this { this.dependency = dependency; return this; }

    constructor(protected collectionResource: MongoCollectionResource) {}

    async find(criteria: DeviceAPIFindCriteriaType): Promise<Device[]> {
        const items = await this.collectionResource.find(criteria, {_id: 0});
        const result = [];

        for (const item of items) {
            result.push(this.makeDevice(item));
        }

        return result;
    }

    async insert(device: Device): Promise<void> {
        const state = device.getState().getValuesObject();
        const {vendor, type, id} = device.selector;
        await this.collectionResource.insert({
            vendor, type, id,
            state,
            status: device.getStatus(),
            lastUpdate: new Date().toISOString(),
            _id: device.selector.toString()
        })
    }

    async update(device: Device): Promise<void> {
        const state = device.getState().getValuesObject();
        console.log(this.constructor.name, 'updating: device state', state);

        const {vendor, type, id} = device.selector;
        await this.collectionResource.collection.updateOne({_id: device.selector.toString()}, {$set: {
            vendor, type, id,
            state,
            status: device.getStatus(),
            lastUpdate: new Date().toISOString(),
        }});
    }

    protected makeDevice(data: IMongoDeviceSchema): Device {
        try{
            return this.getDependency().deviceFactory.get({
                selector: new DeviceSelector(data.vendor, data.type, data.id),
                status: data.status,
                lastUpdate: new Date(data.lastUpdate),
                stateProperties: data.state
            });
        } catch (e) {
            throw new BaseError(this, 'Failed to make device', data, e);
        }
    }

    async getBySelector(selector: DeviceSelector): Promise<Device> {
        const item = await this.collectionResource.collection.findOne({_id: selector.toString()});

        return this.makeDevice(item);
    }

}