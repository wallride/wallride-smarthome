import * as di from '@ips.su/di'


import {MiVendorBuilder} from "../../../../builder/MiVendorBuilder";
import {MessageProcessorFactory} from "../../../../../_abstract/devices/messages/processors/MessageProcessorFactory";
import {MIMessageSerializationProxyFactory} from "../../../common/serialization/factories/MIMessageSerializationProxyFactory";
import {MiAbstractMessage} from "../../../common/messages/MiAbstractMessage";
import {MiMotionSensorReportMessage} from "../messages/report/models/MiMotionSensorReportMessage";
import {MiMotionSensorReportProcessor} from "../messages/report/processors/MiMotionSensorReportProcessor";
import {MiMotionSensorReportProcessorDependency} from "../messages/report/processors/MiMotionSensorReportProcessorDependency";
import {MiMotionSensorReportMessageDeserializer} from "../messages/report/serializers/MiMotionSensorReportMessageDeserializer";
import {MiMotionSensorDeviceName} from "../MiMotionSensorDevice";

export class MiMotionSensorDeviceMixin implements di.ITypedMixin<MiVendorBuilder> {
    protected reportProcessor: di.beans.DependableBean<MiMotionSensorReportProcessorDependency, MiMotionSensorReportProcessor>;
    protected reportProcessorDependency: di.beans.InjectableBean<MiMotionSensorReportProcessorDependency>;

    prepare(builder: MiVendorBuilder): di.MixinPrepareType {
        return {
            heartbeatProcessor: this.reportProcessor = new di.beans.DependableBean(),
            heartbeatProcessorDependency: this.reportProcessorDependency = new di.beans.InjectableBean(),
        }
    }

    inject(builder: MiVendorBuilder): di.AbstractBean<Object>[] {
        builder.then(this,
            builder.serializationFactory,
            builder.messageProcessorFactory,
            this.reportProcessor,
        ).run((
            serializationFactory: MIMessageSerializationProxyFactory,
            processorFactory: MessageProcessorFactory<MiAbstractMessage>,
            motionReportProcessor: MiMotionSensorReportProcessor,
        )=>{
            serializationFactory.register([
                {   cmd: 'report', model: MiMotionSensorDeviceName,
                    classFunction: MiMotionSensorReportMessage,
                    serializer: new MiMotionSensorReportMessageDeserializer()
                },
            ]);

            processorFactory
                .register(MiMotionSensorReportMessage, motionReportProcessor)
        });

        return [
            this.reportProcessor.setup(builder, this, new MiMotionSensorReportProcessor())
                .bind(this.reportProcessorDependency)
                .attach(builder.messageProcessorFactory),
            this.reportProcessorDependency.setup(builder, this, new MiMotionSensorReportProcessorDependency())
                .bind(builder.deviceProvider, (into, value) => into.deviceProvider = value),

        ];
    }

}