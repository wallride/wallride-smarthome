import * as di from '@ips.su/di'

import {MiHeartbeatMessage} from "../devices/common/messages/heartbeat/models/MiHeartbeatMessage";
import {MiHeartbeatProcessor} from "../devices/common/messages/heartbeat/processors/MiHeartbeatProcessor";
import {MiHeartbeatProcessorDependency} from "../devices/common/messages/heartbeat/processors/MiHeartbeatProcessorDependency";
import {MiAbstractMessage} from "../devices/common/messages/MiAbstractMessage";
import {MiReadDeviceAcknowledgeMessage} from "../devices/common/messages/read/models/MiReadDeviceAcknowledgeMessage";
import {MiReadDeviceAcknowledgeProcessor} from "../devices/common/messages/read/processors/MiReadDeviceAcknowledgeProcessor";
import {MiReadDeviceAcknowledgeProcessorDependency} from "../devices/common/messages/read/processors/MiReadDeviceAcknowledgeProcessorDependency";
import {MiDiscoveryReadDeviceAcknowledgeMessageDeserializer} from "../devices/common/messages/read/serializers/MiDiscoveryReadDeviceAcknowledgeMessageDeserializer";
import {MiVendorBuilder} from "./MiVendorBuilder";
import {MessageProcessorFactory} from "../../_abstract/devices/messages/processors/MessageProcessorFactory";
import {MIMessageSerializationProxyFactory} from "../devices/common/serialization/factories/MIMessageSerializationProxyFactory";

export class MiVendorMessagingMixin implements di.ITypedMixin<MiVendorBuilder> {
    protected messageProcessorFactory: di.beans.StaticBean<MessageProcessorFactory<MiAbstractMessage>>;

    protected readDeviceProcessor: di.beans.DependableBean<MiReadDeviceAcknowledgeProcessorDependency, MiReadDeviceAcknowledgeProcessor>;
    protected readDeviceProcessorDependency: di.beans.InjectableBean<MiReadDeviceAcknowledgeProcessorDependency>;

    protected heartbeatProcessor: di.beans.DependableBean<MiHeartbeatProcessorDependency, MiHeartbeatProcessor>;
    protected heartbeatProcessorDependency: di.beans.InjectableBean<MiHeartbeatProcessorDependency>;

    prepare(builder: MiVendorBuilder): di.MixinPrepareType {
        builder.messageProcessorFactory = this.messageProcessorFactory = new di.beans.StaticBean();

        return {
            readDeviceProcessor: this.readDeviceProcessor = new di.beans.DependableBean(),
            readDeviceProcessorDependency: this.readDeviceProcessorDependency = new di.beans.InjectableBean(),

            heartbeatProcessor: this.heartbeatProcessor = new di.beans.DependableBean(),
            heartbeatProcessorDependency: this.heartbeatProcessorDependency = new di.beans.InjectableBean(),
        }
    }

    inject(builder: MiVendorBuilder): di.AbstractBean<Object>[] {
        builder.then(this,
            builder.serializationFactory,
            builder.messageProcessorFactory,
            this.readDeviceProcessor,
            this.heartbeatProcessor,
        ).run((
            serializationFactory: MIMessageSerializationProxyFactory,
            processorFactory: MessageProcessorFactory<MiAbstractMessage>,
            readDeviceProcessor: MiReadDeviceAcknowledgeProcessor,
            heartbeatProcessor: MiHeartbeatProcessor,
        )=>{
            serializationFactory.register([
                {   cmd: 'read_ack',
                    classFunction: MiReadDeviceAcknowledgeMessage,
                    serializer: new MiDiscoveryReadDeviceAcknowledgeMessageDeserializer()},
            ]);

            processorFactory
                .register(MiReadDeviceAcknowledgeMessage, readDeviceProcessor)
                .register(MiHeartbeatMessage, heartbeatProcessor)
        });

        return [
            this.messageProcessorFactory.setup(builder, this, new MessageProcessorFactory()),

            this.readDeviceProcessor.setup(builder, this, new MiReadDeviceAcknowledgeProcessor())
                .bind(this.readDeviceProcessorDependency)
                .attach(builder.messageProcessorFactory),
            this.readDeviceProcessorDependency.setup(builder, this, new MiReadDeviceAcknowledgeProcessorDependency())
                .bind(builder.deviceFactory, (into, value) => into.deviceFactory = value)
                .bind(builder.deviceProvider, (into, value) => into.deviceProvider = value)
                .bind(builder.gatewaySubdevicesProvider, (into, value) => into.gatewaySubdevicesProvider = value),

            this.heartbeatProcessor.setup(builder, this, new MiHeartbeatProcessor())
                .bind(this.heartbeatProcessorDependency)
                .attach(builder.messageProcessorFactory),
            this.heartbeatProcessorDependency.setup(builder, this, new MiHeartbeatProcessorDependency())
                .bind(builder.deviceProvider, (into, value) => into.deviceProvider = value),

        ];
    }

}