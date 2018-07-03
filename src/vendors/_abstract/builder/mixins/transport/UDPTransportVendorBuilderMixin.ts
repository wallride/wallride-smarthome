import * as di from '@ips.su/di'

import {UDPResourceConfigurationType} from "../../../../../resources/udp/UDPResourceConfigurationType";
import {UDPSocketResourceProvider} from "../../../../../resources/udp/UDPSocketResourceProvider";
import {UDPTransport, UDPTransportOptions} from "../../../transport/udp/UDPTransport";
import {UDPTransportDependency} from "../../../transport/udp/UDPTransportDependency";
import {AbstractVendorBuilder} from "../../AbstractVendorBuilder";

export class UDPTransportVendorBuilderMixin implements di.ITypedMixin<AbstractVendorBuilder<any, any>> {
    protected transport: di.beans.DependableBean<UDPTransportDependency, UDPTransport>;
    protected transportDependency: di.beans.InjectableBean<UDPTransportDependency>;

    protected resourceProvider: di.beans.StaticBean<UDPSocketResourceProvider>;

    constructor(protected transportOptions: UDPTransportOptions, protected resourceConfigurations: UDPResourceConfigurationType[]) {}

    prepare(builder: AbstractVendorBuilder<any, any>): di.MixinPrepareType {
        builder.transport = this.transport = new di.beans.DependableBean();

        return {
            transportDependency: this.transportDependency = new di.beans.InjectableBean(),

            resourceProvider: this.resourceProvider = new di.beans.StaticBean(),
        };
    }

    inject(builder: AbstractVendorBuilder<any, any>): di.AbstractBean[] {
        return [
            this.transport.setup(builder, this, new UDPTransport(this.transportOptions))
                .bind(this.transportDependency)
                .attach(builder.vendor), // let it be so... Not correct in fact
            this.transportDependency.setup(builder, this, new UDPTransportDependency())
                .bind(this.resourceProvider, (into, value) => into.resourceProvider = value),

            this.resourceProvider.setup(builder, this, new UDPSocketResourceProvider(this.resourceConfigurations)),
        ];
    }

}