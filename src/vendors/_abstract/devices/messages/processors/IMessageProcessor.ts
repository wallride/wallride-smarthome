import {AbstractMessage} from "../models/AbstractMessage";

export interface IMessageProcessor<M extends AbstractMessage> {
    process(message: M): Promise<void>
}