import * as di from '@ips.su/di'

import {MongoCollectionResource} from "../../../../../resources/db/mongo/MongoCollectionResource";
import {AbstractDevice} from "../../../../../models/devices/AbstractDevice";
import {DevicesAPIDependency} from "../../../devices/api/DevicesAPIDependency";
import {MongoDevicesAPI} from "../../../devices/api/mongo/MongoDevicesAPI";
import {AbstractVendorBuilder} from "../../AbstractVendorBuilder";

export class MongoAPIVendorBuilderMixin<Device extends AbstractDevice> implements di.ITypedMixin<AbstractVendorBuilder<any, Device>> {
    protected api: di.beans.DependableBean<DevicesAPIDependency<Device>, MongoDevicesAPI<Device>>;
    protected apiDependency: di.beans.InjectableBean<DevicesAPIDependency<Device>>;

    constructor(protected collectionResource: MongoCollectionResource) {}

    prepare(builder: AbstractVendorBuilder<any, Device>): di.MixinPrepareType {
        builder.deviceAPI = this.api = new di.beans.DependableBean();

        return {
            apiDependency: this.apiDependency = new di.beans.InjectableBean(),
        };
    }

    inject(builder: AbstractVendorBuilder<any, Device>): di.AbstractBean[] {
        return [
            this.api.setup(builder, this, new MongoDevicesAPI(this.collectionResource))
                .bind(this.apiDependency)
                .attach(builder.deviceProvider), // let it be so...
            this.apiDependency.setup(builder, this, new DevicesAPIDependency())
                .bind(builder.deviceFactory, (into, value) => into.deviceFactory = value),
        ];
    }

}