import * as di from '@ips.su/di'
import * as im from '@ips.su/im'

import {IMessageProcessorFactory} from "../../devices/messages/processors/IMessageProcessorFactory";
import {AbstractMessage} from "../../devices/messages/models/AbstractMessage";
import {ITransport, ITransportPacket} from "../../transport/ITransport";

export class SerializableMessageProviderDependency<M extends AbstractMessage, T, P extends ITransportPacket<T>> implements di.Injectable {
    parser: im.io.IParser<im.io.AbstractInput, T> = null;
    messageSerializationFactory: im.factories.AbstractProxySerializationFactory<M> = null;
    messageProcessorFactory: IMessageProcessorFactory<M> = null;
    transport: ITransport<P> = null;

    isValid(): boolean {
        return !!(this.parser && this.messageSerializationFactory && this.messageProcessorFactory && this.transport);
    }


}