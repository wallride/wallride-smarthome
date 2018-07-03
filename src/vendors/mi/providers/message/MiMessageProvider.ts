import * as di from "@ips.su/di";

import {SerializableMessageProvider} from "../../../_abstract/providers/message/SerializableMessageProvider";
import {ITCPTransportPacket} from "../../../_abstract/transport/ITCPTransport";
import {MiAbstractMessage} from "../../devices/common/messages/MiAbstractMessage";
import {MiMessageProviderDependency} from "./MiMessageProviderDependency";

export class MiMessageProvider extends SerializableMessageProvider<MiAbstractMessage, Buffer, ITCPTransportPacket>
            implements di.Dependable<MiMessageProviderDependency> {
    protected dependency: MiMessageProviderDependency;
    getDependency(): MiMessageProviderDependency {return this.dependency}
    injectDependency(dependency: MiMessageProviderDependency): this {this.dependency = dependency; return this;}

}