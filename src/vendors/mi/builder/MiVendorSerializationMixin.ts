import * as di from '@ips.su/di'
import * as im from '@ips.su/im'

import {MiDiscoveryIAmResponseMessage} from "../devices/discovery/messages/whois/models/MiDiscoveryIAmResponseMessage";
import {MiDiscoveryWhoisRequestMessage} from "../devices/discovery/messages/whois/models/MiDiscoveryWhoisRequestMessage";
import {MiDiscoveryIAmMessageDeserializer} from "../devices/discovery/messages/whois/serializers/MiDiscoveryIAmMessageDeserializer";
import {MiDiscoveryWhoisMessageSerializer} from "../devices/discovery/messages/whois/serializers/MiDiscoveryWhoisMessageSerializer";
import {MiVendorBuilder} from "./MiVendorBuilder";
import {MIMessageSerializationProxyFactory} from "../devices/common/serialization/factories/MIMessageSerializationProxyFactory";

export class MiVendorSerializationMixin implements di.ITypedMixin<MiVendorBuilder> {
    protected formatter: di.beans.StaticBean<im.io.json.implementations.def.JSONBufferFormatter>;
    protected parser: di.beans.StaticBean<im.io.json.implementations.def.JSONBufferParser>;

    protected serializationFactory: di.beans.DependableBean<im.factories.ProxySerializationFactoryDependency, MIMessageSerializationProxyFactory>;
    protected serializationFactoryDependency: di.beans.InjectableBean<im.factories.ProxySerializationFactoryDependency>;

    protected classFactory: di.beans.DependableBean<im.factories.RegisteredClassSerializationFactoryDependency, im.factories.RegisteredClassesSerializationFactory>;
    protected classFactoryDependency: di.beans.InjectableBean<im.factories.RegisteredClassSerializationFactoryDependency>;


    prepare(builder: MiVendorBuilder): di.MixinPrepareType {
        builder.formatter = this.formatter = new di.beans.StaticBean();
        builder.parser = this.parser = new di.beans.StaticBean();
        builder.serializationFactory = this.serializationFactory = new di.beans.DependableBean();

        return {
            serializationFactoryDependency: this.serializationFactoryDependency = new di.beans.InjectableBean(),

            classFactory: this.classFactory = new di.beans.DependableBean(),
            classFactoryDependency: this.classFactoryDependency = new di.beans.InjectableBean(),
        };
    }

    inject(builder: MiVendorBuilder): di.AbstractBean<Object>[] {
        return [
            this.parser.setup(builder, this, new im.io.json.implementations.def.JSONBufferParser()),
            this.formatter.setup(builder, this, new im.io.json.implementations.def.JSONBufferFormatter()),

            this.serializationFactory.setup(builder, this, new MIMessageSerializationProxyFactory())
                .bind(this.serializationFactoryDependency),
            this.serializationFactoryDependency.setup(builder, this, new im.factories.ProxySerializationFactoryDependency())
                .bind(this.classFactory, (into, value) => into.classFactory = value),

            this.classFactory.setup(builder, this, new im.factories.RegisteredClassesSerializationFactory())
                .bind(this.classFactoryDependency),
            this.classFactoryDependency.setup(builder, this, new im.factories.RegisteredClassSerializationFactoryDependency(new im.factories.instructions.SerializationInstructionsFactory())),
        ];
    }

}