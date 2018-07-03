import {SerializableMessageProviderDependency} from "../../../_abstract/providers/message/SerializableMessageProviderDependency";
import {ITCPTransportPacket} from "../../../_abstract/transport/ITCPTransport";
import {UDPTransport} from "../../../_abstract/transport/udp/UDPTransport";
import {MiAbstractMessage} from "../../devices/common/messages/MiAbstractMessage";
import {MIMessageSerializationProxyFactory} from "../../devices/common/serialization/factories/MIMessageSerializationProxyFactory";

export class MiMessageProviderDependency extends SerializableMessageProviderDependency<MiAbstractMessage, Buffer, ITCPTransportPacket> {
    transport: UDPTransport = null;
    messageSerializationFactory: MIMessageSerializationProxyFactory = null;
}