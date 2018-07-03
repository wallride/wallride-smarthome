import * as im from "@ips.su/im";

import {MIMessageSerializationProxyFactory} from "../../../../common/serialization/factories/MIMessageSerializationProxyFactory";
import {MiHeartbeatMessageDeserializer} from "../../../../common/messages/heartbeat/serializers/MiHeartbeatMessageDeserializer";
import {MiGatewayHeartbeatMessage} from "../models/MiGatewayHeartbeatMessage";

export class MiGatewayHeartbeatMessageDeserializer extends MiHeartbeatMessageDeserializer<MiGatewayHeartbeatMessage> {

    async read(message: MiGatewayHeartbeatMessage, input: im.io.json.implementations.def.inputs.JSObjectInput, factory: MIMessageSerializationProxyFactory): Promise<void> {
        await super.read(message, input, factory);

        message.token = input.getProperty('token').asString().getValue();
    }

}