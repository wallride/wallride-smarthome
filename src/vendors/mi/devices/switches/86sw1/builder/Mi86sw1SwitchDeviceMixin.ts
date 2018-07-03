import * as di from '@ips.su/di'


import {MiVendorBuilder} from "../../../../builder/MiVendorBuilder";
import {MessageProcessorFactory} from "../../../../../_abstract/devices/messages/processors/MessageProcessorFactory";
import {MIMessageSerializationProxyFactory} from "../../../common/serialization/factories/MIMessageSerializationProxyFactory";
import {MiAbstractMessage} from "../../../common/messages/MiAbstractMessage";
import {Mi86sw1SwitchReportMessage} from "../messages/report/models/Mi86sw1SwitchReportMessage";
import {Mi86sw1SwitchReportProcessor} from "../messages/report/processors/Mi86sw1SwitchReportProcessor";
import {Mi86sw1SwitchReportProcessorDependency} from "../messages/report/processors/Mi86sw1SwitchReportProcessorDependency";
import {Mi86sw1SwitchReportMessageDeserializer} from "../messages/report/serializers/Mi86sw1SwitchReportMessageDeserializer";
import {Mi86sw1SwitchDeviceName} from "../Mi86sw1SwitchDevice";

export class Mi86sw1SwitchDeviceMixin implements di.ITypedMixin<MiVendorBuilder> {
    protected reportProcessor: di.beans.DependableBean<Mi86sw1SwitchReportProcessorDependency, Mi86sw1SwitchReportProcessor>;
    protected reportProcessorDependency: di.beans.InjectableBean<Mi86sw1SwitchReportProcessorDependency>;

    prepare(builder: MiVendorBuilder): di.MixinPrepareType {
        return {
            reportProcessor: this.reportProcessor = new di.beans.DependableBean(),
            reportProcessorDependency: this.reportProcessorDependency = new di.beans.InjectableBean(),
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
            motionReportProcessor: Mi86sw1SwitchReportProcessor,
        )=>{
            serializationFactory.register([
                {   cmd: 'report', model: Mi86sw1SwitchDeviceName,
                    classFunction: Mi86sw1SwitchReportMessage,
                    serializer: new Mi86sw1SwitchReportMessageDeserializer()
                },
            ]);

            processorFactory
                .register(Mi86sw1SwitchReportMessage, motionReportProcessor)
        });

        return [
            this.reportProcessor.setup(builder, this, new Mi86sw1SwitchReportProcessor())
                .bind(this.reportProcessorDependency)
                .attach(builder.messageProcessorFactory),
            this.reportProcessorDependency.setup(builder, this, new Mi86sw1SwitchReportProcessorDependency())
                .bind(builder.deviceProvider, (into, value) => into.deviceProvider = value),

        ];
    }

}