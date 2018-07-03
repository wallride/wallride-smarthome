import * as di from '@ips.su/di'

import {UDPSocketResourceProvider} from "../../../resources/udp/UDPSocketResourceProvider";
import {IMiVendorConfiguration} from "../configuration/IMiVendorConfiguration";
import {MiGatewayKeyProvider} from "../devices/gateway/providers/MiGatewayKeyProvider";
import {MiGatewayKeyProviderDependency} from "../devices/gateway/providers/MiGatewayKeyProviderDependency";
import {MiGatewaySubdevicesProvider} from "../devices/gateway/providers/MiGatewaySubdevicesProvider";
import {MiDeviceFactory} from "../devices/MiDeviceFactory";
import {MiVendor} from "../MiVendor";
import {MiMessageProvider} from "../providers/message/MiMessageProvider";
import {MiMessageProviderDependency} from "../providers/message/MiMessageProviderDependency";
import {MiDeviceProviderDependency} from "../providers/MiDeviceProviderDependency";
import {MiVendorBuilder} from "./MiVendorBuilder";
import {MiVendorDependency} from "../MiVendorDependency";
import {MiDeviceProvider} from "../providers/MiDeviceProvider";
import {UDPTransport} from "../../_abstract/transport/udp/UDPTransport";
import {UDPTransportDependency} from "../../_abstract/transport/udp/UDPTransportDependency";
import {MiMessageSender} from "../transport/sender/MiMessageSender";
import {MiMessageSenderDependency} from "../transport/sender/MiMessageSenderDependency";

export class MiVendorBuilderMixin implements di.ITypedMixin<MiVendorBuilder> {
    protected vendor: di.beans.DependableBean<MiVendorDependency, MiVendor>;
    protected vendorDependency: di.beans.InjectableBean<MiVendorDependency>;

    protected deviceProvider: di.beans.DependableBean<MiDeviceProviderDependency, MiDeviceProvider>;
    protected deviceProviderDependency: di.beans.InjectableBean<MiDeviceProviderDependency>;

    protected deviceFactory: di.beans.StaticBean<MiDeviceFactory>;

    protected messageSender: di.beans.DependableBean<MiMessageSenderDependency, MiMessageSender>;
    protected messageSenderDependency: di.beans.InjectableBean<MiMessageSenderDependency>;

    protected transport: di.beans.DependableBean<UDPTransportDependency, UDPTransport>;
    protected transportDependency: di.beans.InjectableBean<UDPTransportDependency>;

    protected resourceProvider: di.beans.StaticBean<UDPSocketResourceProvider>;

    protected messageProvider: di.beans.DependableBean<MiMessageProviderDependency, MiMessageProvider>;
    protected messageProviderDependency: di.beans.InjectableBean<MiMessageProviderDependency>;

    protected gatewaySubdevicesProvider: di.beans.StaticBean<MiGatewaySubdevicesProvider>;

    protected gatewayKeyProvider: di.beans.DependableBean<MiGatewayKeyProviderDependency,MiGatewayKeyProvider>;
    protected gatewayKeyProviderDependency: di.beans.InjectableBean<MiGatewayKeyProviderDependency>;

    constructor(protected configuration: IMiVendorConfiguration) {}

    prepare(builder: MiVendorBuilder): di.MixinPrepareType {
        builder.vendor = this.vendor = new di.beans.DependableBean();
        builder.deviceProvider = this.deviceProvider = new di.beans.DependableBean();
        builder.deviceFactory = this.deviceFactory = new di.beans.StaticBean();
        builder.messageSender = this.messageSender = new di.beans.DependableBean();
        builder.gatewaySubdevicesProvider = this.gatewaySubdevicesProvider = new di.beans.StaticBean();
        builder.gatewayKeyProvider = this.gatewayKeyProvider = new di.beans.DependableBean();

        return {
            vendorDependency: this.vendorDependency = new di.beans.InjectableBean(),

            deviceProviderDependency: this.deviceProviderDependency = new di.beans.InjectableBean(),

            messageSenderDependency: this.messageSenderDependency = new di.beans.InjectableBean(),

            transport: this.transport = new di.beans.DependableBean(),
            transportDependency: this.transportDependency = new di.beans.InjectableBean(),

            resourceProvider: this.resourceProvider = new di.beans.StaticBean(),

            messageProvider: this.messageProvider = new di.beans.DependableBean(),
            messageProviderDependency: this.messageProviderDependency = new di.beans.InjectableBean(),

            gatewayKeyProviderDependency: this.gatewayKeyProviderDependency = new di.beans.InjectableBean(),
        };
    }

    inject(builder: MiVendorBuilder): di.AbstractBean[] {
        builder.then(this, this.deviceProvider).run(async (provider: MiDeviceProvider) => {
            await provider.setup(this.configuration.devices);
        });

        return [
            this.vendor.setup(builder, this, new MiVendor(this.configuration))
                .bind(this.vendorDependency),
            this.vendorDependency.setup(builder, this, new MiVendorDependency())
                .bind(this.messageProvider, (into, value) => into.messageProvider = value)
                .bind(this.deviceProvider, (into, value) => into.deviceProvider = value)
                .bind(this.messageSender, (into, value) => into.messageSender = value),

            this.deviceProvider.setup(builder, this, new MiDeviceProvider())
                .bind(this.deviceProviderDependency),
            this.deviceProviderDependency.setup(builder, this, new MiDeviceProviderDependency())
                .bind(builder.deviceAPI, (into, value) => into.deviceAPI = value),

            this.deviceFactory.setup(builder, this, new MiDeviceFactory(this.configuration.devices)),

            this.messageSender.setup(builder, this, new MiMessageSender())
                .bind(this.messageSenderDependency),
            this.messageSenderDependency.setup(builder, this, new MiMessageSenderDependency())
                .bind(builder.transport, (into, value) => into.transport = value)
                .bind(builder.formatter, (into, value) => into.formatter = value)
                .bind(builder.serializationFactory, (into, value) => into.serializationFactory = value),

            this.transport.setup(builder, this, new UDPTransport(this.configuration.transport))
                .bind(this.transportDependency)
                .attach(builder.vendor), // let it be so... Not correct in fact
            this.transportDependency.setup(builder, this, new UDPTransportDependency())
                .bind(this.resourceProvider, (into, value) => into.resourceProvider = value),

            this.resourceProvider.setup(builder, this, new UDPSocketResourceProvider(this.configuration.resources.udp)),

            this.messageProvider.setup(builder, this, new MiMessageProvider())
                .bind(this.messageProviderDependency),
            this.messageProviderDependency.setup(builder, this, new MiMessageProviderDependency())
                .bind(builder.transport, (into, value) => into.transport = value)
                .bind(builder.messageProcessorFactory, (into, value) => into.messageProcessorFactory = value)
                .bind(builder.parser, (into, value) => into.parser = value)
                .bind(builder.serializationFactory, (into, value) => into.messageSerializationFactory = value),

            this.gatewaySubdevicesProvider.setup(builder, this, new MiGatewaySubdevicesProvider()),

            this.gatewayKeyProvider.setup(builder, this, new MiGatewayKeyProvider())
                .bind(this.gatewayKeyProviderDependency),
            this.gatewayKeyProviderDependency.setup(builder, this, new MiGatewayKeyProviderDependency())
                .bind(builder.deviceProvider, (into, value) => into.deviceProvider = value),

        ];
    }

}