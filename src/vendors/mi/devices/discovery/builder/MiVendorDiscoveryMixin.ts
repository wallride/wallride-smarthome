import * as di from '@ips.su/di'

import {MiVendorBuilder} from "../../../builder/MiVendorBuilder";
import {MessageProcessorFactory} from "../../../../_abstract/devices/messages/processors/MessageProcessorFactory";
import {MIMessageSerializationProxyFactory} from "../../common/serialization/factories/MIMessageSerializationProxyFactory";
import {MiAbstractMessage} from "../../common/messages/MiAbstractMessage";
import {MiDiscoveryGetSubdevicesAcknowledgeMessage} from "../messages/getSubdevices/models/MiDiscoveryGetSubdevicesAcknowledgeMessage";
import {MiDiscoveryGetSubdevicesMessage} from "../messages/getSubdevices/models/MiDiscoveryGetSubdevicesMessage";
import {MiDiscoveryIAmResponseMessage} from "../messages/whois/models/MiDiscoveryIAmResponseMessage";
import {MiDiscoveryReadDeviceMessage} from "../../common/messages/read/models/MiDiscoveryReadDeviceMessage";
import {MiDiscoveryWhoisRequestMessage} from "../messages/whois/models/MiDiscoveryWhoisRequestMessage";
import {MiDiscoveryGetSubdevicesAcknowledgeProcessor} from "../messages/getSubdevices/processors/MiDiscoveryGetSubdevicesAcknowledgeProcessor";
import {MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency} from "../messages/getSubdevices/processors/MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency";
import {MiDiscoveryIAmProcessor} from "../messages/whois/processors/MiDiscoveryIAmProcessor";
import {MiDiscoveryIAmProcessorDependency} from "../messages/whois/processors/MiDiscoveryIAmProcessorDependency";
import {MiDiscoveryGetSubdevicesAcknowledgeMessageDeserializer} from "../messages/getSubdevices/serializers/MiDiscoveryGetSubdevicesAcknowledgeMessageDeserializer";
import {MiDiscoveryGetSubdevicesMessageSerializer} from "../messages/getSubdevices/serializers/MiDiscoveryGetSubdevicesMessageSerializer";
import {MiDiscoveryIAmMessageDeserializer} from "../messages/whois/serializers/MiDiscoveryIAmMessageDeserializer";
import {MiDiscoveryReadDeviceMessageSerializer} from "../../common/messages/read/serializers/MiDiscoveryReadDeviceMessageSerializer";
import {MiDiscoveryWhoisMessageSerializer} from "../messages/whois/serializers/MiDiscoveryWhoisMessageSerializer";

export class MiVendorDiscoveryMixin implements di.ITypedMixin<MiVendorBuilder> {
    protected discoveryIAmProcessor: di.beans.DependableBean<MiDiscoveryIAmProcessorDependency, MiDiscoveryIAmProcessor>;
    protected discoveryIAmProcessorDependency: di.beans.InjectableBean<MiDiscoveryIAmProcessorDependency>;

    protected discoveryGetSubdevicesAcknowledgeProcessor: di.beans.DependableBean<MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency, MiDiscoveryGetSubdevicesAcknowledgeProcessor>;
    protected discoveryGetSubdevicesAcknowledgeProcessorDependency: di.beans.InjectableBean<MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency>;

    prepare(builder: MiVendorBuilder): di.MixinPrepareType {
        return {
            discoveryIAmProcessor: this.discoveryIAmProcessor = new di.beans.DependableBean(),
            discoveryIAmProcessorDependency: this.discoveryIAmProcessorDependency = new di.beans.InjectableBean(),

            discoveryGetSubdevicesAcknowledgeProcessor: this.discoveryGetSubdevicesAcknowledgeProcessor = new di.beans.DependableBean(),
            discoveryGetSubdevicesAcknowledgeProcessorDependency: this.discoveryGetSubdevicesAcknowledgeProcessorDependency = new di.beans.InjectableBean(),
        }
    }

    inject(builder: MiVendorBuilder): di.AbstractBean[] {
        builder.then(this,
            builder.serializationFactory,
            builder.messageProcessorFactory,
            this.discoveryGetSubdevicesAcknowledgeProcessor,
            this.discoveryIAmProcessor,
        ).run((
            serializationFactory: MIMessageSerializationProxyFactory,
            processorFactory: MessageProcessorFactory<MiAbstractMessage>,
            getSubdeviceProcessor: MiDiscoveryGetSubdevicesAcknowledgeProcessor,
            iamProcessor: MiDiscoveryIAmProcessor,
        )=>{
            serializationFactory.register([
                {   cmd: 'whois',
                    classFunction: MiDiscoveryWhoisRequestMessage,
                    serializer: new MiDiscoveryWhoisMessageSerializer()},
                {   cmd: 'iam',
                    classFunction: MiDiscoveryIAmResponseMessage,
                    serializer: new MiDiscoveryIAmMessageDeserializer()},
                {   cmd: 'get_id_list',
                    classFunction: MiDiscoveryGetSubdevicesMessage,
                    serializer: new MiDiscoveryGetSubdevicesMessageSerializer()},
                {   cmd: 'get_id_list_ack',
                    classFunction: MiDiscoveryGetSubdevicesAcknowledgeMessage,
                    serializer: new MiDiscoveryGetSubdevicesAcknowledgeMessageDeserializer()},
                {   cmd: 'read',
                    classFunction: MiDiscoveryReadDeviceMessage,
                    serializer: new MiDiscoveryReadDeviceMessageSerializer()},
            ]);

            processorFactory
                .register(MiDiscoveryGetSubdevicesAcknowledgeMessage, getSubdeviceProcessor)
                .register(MiDiscoveryIAmResponseMessage, iamProcessor)
        });


        return [

            this.discoveryIAmProcessor.setup(builder, this, new MiDiscoveryIAmProcessor())
                .bind(this.discoveryIAmProcessorDependency)
                .attach(builder.messageProcessorFactory),
            this.discoveryIAmProcessorDependency.setup(builder, this, new MiDiscoveryIAmProcessorDependency())
                .bind(builder.messageSender, (into, value) => into.messageSender = value)
                .bind(builder.deviceFactory, (into, value) => into.deviceFactory = value)
                .bind(builder.deviceProvider, (into, value) => into.deviceProvider = value),

            this.discoveryGetSubdevicesAcknowledgeProcessor.setup(builder, this, new MiDiscoveryGetSubdevicesAcknowledgeProcessor())
                .bind(this.discoveryGetSubdevicesAcknowledgeProcessorDependency)
                .attach(builder.messageProcessorFactory),
            this.discoveryGetSubdevicesAcknowledgeProcessorDependency.setup(builder, this, new MiDiscoveryGetSubdevicesAcknowledgeProcessorDependency())
                .bind(builder.gatewayKeyProvider, (into, value) => into.gatewayKeyProvider = value)
                .bind(builder.gatewaySubdevicesProvider, (into, value) => into.gatewaySubdevicesProvider = value)
                .bind(builder.messageSender, (into, value) => into.messageSender = value)
                .bind(builder.deviceProvider, (into, value) => into.deviceProvider = value)

        ];
    }

}