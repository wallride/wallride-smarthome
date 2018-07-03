import * as di from '@ips.su/di'
import * as im from '@ips.su/im'

import {UDPTransport} from "../../../_abstract/transport/udp/UDPTransport";
import {MIMessageSerializationProxyFactory} from "../../devices/common/serialization/factories/MIMessageSerializationProxyFactory";

export class MiMessageSenderDependency implements di.Injectable {
    transport: UDPTransport = null;
    formatter: im.io.json.JSONAbstractFormatter<Buffer> = null;
    serializationFactory: MIMessageSerializationProxyFactory = null;

    isValid(): boolean {
        return !!(this.formatter && this.serializationFactory && this.transport);
    }
}