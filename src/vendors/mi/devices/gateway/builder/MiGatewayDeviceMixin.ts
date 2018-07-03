import * as di from '@ips.su/di'
import {MiAbstractMessage} from "../../common/messages/MiAbstractMessage";

import {MiGatewayHeartbeatMessage} from "../messages/heartbeat/models/MiGatewayHeartbeatMessage";
import {MiGatewayHeartbeatProcessor} from "../messages/heartbeat/processors/MiGatewayHeartbeatProcessor";
import {MiGatewayHeartbeatProcessorDependency} from "../messages/heartbeat/processors/MiGatewayHeartbeatProcessorDependency";
import {MiGatewayHeartbeatMessageDeserializer} from "../messages/heartbeat/serializers/MiGatewayHeartbeatMessageDeserializer";
import {MiGatewayDeviceName} from "../MiGatewayDevice";

import {MiVendorBuilder} from "../../../builder/MiVendorBuilder";
import {MessageProcessorFactory} from "../../../../_abstract/devices/messages/processors/MessageProcessorFactory";
import {MIMessageSerializationProxyFactory} from "../../common/serialization/factories/MIMessageSerializationProxyFactory";

export class MiGatewayDeviceMixin implements di.ITypedMixin<MiVendorBuilder> {
    protected gatewayHeartbeatProcessor: di.beans.DependableBean<MiGatewayHeartbeatProcessorDependency, MiGatewayHeartbeatProcessor>;
    protected gatewayHeartbeatProcessorDependency: di.beans.InjectableBean<MiGatewayHeartbeatProcessorDependency>;

    prepare(builder: MiVendorBuilder): di.MixinPrepareType {
        return {
            heartbeatProcessor: this.gatewayHeartbeatProcessor = new di.beans.DependableBean(),
            heartbeatProcessorDependency: this.gatewayHeartbeatProcessorDependency = new di.beans.InjectableBean(),
        }
    }

    inject(builder: MiVendorBuilder): di.AbstractBean<Object>[] {
        builder.then(this,
            builder.serializationFactory,
            builder.messageProcessorFactory,
            this.gatewayHeartbeatProcessor,
        ).run((
            serializationFactory: MIMessageSerializationProxyFactory,
            processorFactory: MessageProcessorFactory<MiAbstractMessage>,
            gatewayHeartbeatProcessor: MiGatewayHeartbeatProcessor,
        )=>{
            serializationFactory.register([
                {   cmd: 'heartbeat', model: MiGatewayDeviceName,
                    classFunction: MiGatewayHeartbeatMessage,
                    serializer: new MiGatewayHeartbeatMessageDeserializer()
                },
            ]);

            processorFactory
                .register(MiGatewayHeartbeatMessage, gatewayHeartbeatProcessor)
        });

        return [
            this.gatewayHeartbeatProcessor.setup(builder, this, new MiGatewayHeartbeatProcessor())
                .bind(this.gatewayHeartbeatProcessorDependency)
                .attach(builder.messageProcessorFactory),
            this.gatewayHeartbeatProcessorDependency.setup(builder, this, new MiGatewayHeartbeatProcessorDependency())
                .bind(builder.deviceProvider, (into, value) => into.deviceProvider = value)
                .bind(builder.gatewayKeyProvider, (into, value) => into.gatewayKeyProvider = value),

        ];
    }

}