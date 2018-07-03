import * as di from '@ips.su/di'
import * as im from "@ips.su/im";
import {BaseError} from "../../../BaseError";
import {MongoCollectionResource} from "../../../resources/db/mongo/MongoCollectionResource";

import {AbstractVendorBuilder} from "../../_abstract/builder/AbstractVendorBuilder";
import {MongoAPIVendorBuilderMixin} from "../../_abstract/builder/mixins/api/MongoAPIVendorBuilderMixin";
import {UDPTransportVendorBuilderMixin} from "../../_abstract/builder/mixins/transport/UDPTransportVendorBuilderMixin";
import {MessageProcessorFactory} from "../../_abstract/devices/messages/processors/MessageProcessorFactory";
import {UDPTransport} from "../../_abstract/transport/udp/UDPTransport";
import {MiAbstractMessage} from "../devices/common/messages/MiAbstractMessage";
import {MiGatewayDeviceMixin} from "../devices/gateway/builder/MiGatewayDeviceMixin";
import {MiAnyDevice} from "../devices/MiAbstractDevice";
import {MiMotionSensorDeviceMixin} from "../devices/sensors/motion/builder/MiMotionSensorDeviceMixin";
import {Mi86sw1SwitchDeviceMixin} from "../devices/switches/86sw1/builder/Mi86sw1SwitchDeviceMixin";
import {MiVendorBuilderMixin} from "./MiVendorBuilderMixin";
import {MiVendorMessagingMixin} from "./MiVendorMessagingMixin";
import {MiVendorSerializationMixin} from "./MiVendorSerializationMixin";
import {IMiVendorConfiguration} from "../configuration/IMiVendorConfiguration";
import {MiVendorDiscoveryMixin} from "../devices/discovery/builder/MiVendorDiscoveryMixin";
import {MiGatewayKeyProvider} from "../devices/gateway/providers/MiGatewayKeyProvider";
import {MiGatewaySubdevicesProvider} from "../devices/gateway/providers/MiGatewaySubdevicesProvider";
import {MiDeviceFactory} from "../devices/MiDeviceFactory";
import {MiVendor} from "../MiVendor";
import {MiDeviceProvider} from "../providers/MiDeviceProvider";
import {MiMessageSender} from "../transport/sender/MiMessageSender";
import {MIMessageSerializationProxyFactory} from "../devices/common/serialization/factories/MIMessageSerializationProxyFactory";

export class MiVendorBuilder extends AbstractVendorBuilder<MiVendor, MiAnyDevice> {
    deviceProvider: di.AbstractBean<MiDeviceProvider>;
    messageSender: di.AbstractBean<MiMessageSender>;

    messageProcessorFactory: di.AbstractBean<MessageProcessorFactory<MiAbstractMessage>>;
    transport: di.AbstractBean<UDPTransport>;

    serializationFactory: di.AbstractBean<MIMessageSerializationProxyFactory>;

    formatter: di.AbstractBean<im.io.json.implementations.def.JSONBufferFormatter>;
    parser: di.AbstractBean<im.io.json.implementations.def.JSONBufferParser>;

    deviceFactory: di.AbstractBean<MiDeviceFactory>;

    gatewaySubdevicesProvider: di.AbstractBean<MiGatewaySubdevicesProvider>;
    gatewayKeyProvider: di.AbstractBean<MiGatewayKeyProvider>;

    constructor(configuration: IMiVendorConfiguration, devicesCollectionResource: MongoCollectionResource) {
        super(configuration);

        switch(configuration.transport.type){
            case 'udp':
                this.mix(new UDPTransportVendorBuilderMixin(configuration.transport, configuration.resources.udp)); break;
            default:
                throw new BaseError(this, 'Transport type is not supported', configuration.transport);
        }

        this.mix(new MongoAPIVendorBuilderMixin(devicesCollectionResource))
            .mix(new MiVendorBuilderMixin(configuration))
            .mix(new MiVendorSerializationMixin())
            .mix(new MiVendorMessagingMixin());

        // device-specific mixins
        this.mix(new MiVendorDiscoveryMixin())
            .mix(new MiGatewayDeviceMixin())
            .mix(new MiMotionSensorDeviceMixin())
            .mix(new Mi86sw1SwitchDeviceMixin())
    }
}