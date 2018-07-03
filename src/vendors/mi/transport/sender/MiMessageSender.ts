import * as di from '@ips.su/di'

import {BaseError} from "../../../../BaseError";
import {NetworkAddressType} from "../../../../resources/NetworkAddressType";
import {MiAbstractMessage} from "../../devices/common/messages/MiAbstractMessage";
import {MiMessageSenderDependency} from "./MiMessageSenderDependency";

export class MiMessageSender implements di.Dependable<MiMessageSenderDependency> {
    protected dependency: MiMessageSenderDependency;
    injectDependency(dependency: MiMessageSenderDependency): this { this.dependency = dependency; return this; }
    getDependency(): MiMessageSenderDependency { return this.dependency}

    async send(message: MiAbstractMessage, address: NetworkAddressType): Promise<void> {
        const {formatter, serializationFactory, transport} = this.getDependency();
        let data: Buffer;

        try {
            const output = formatter.makeOutput();
            await serializationFactory.serialize(message, output);
            data = await formatter.format(output);
        }catch (e) {
            throw new BaseError(this, 'Failed to serialize message', message, e);
        }

        try {
            await transport.send({data, address});
        } catch (e) {
            throw new BaseError(this, 'Failed to send the serialized message', message, e);
        }
    }

}