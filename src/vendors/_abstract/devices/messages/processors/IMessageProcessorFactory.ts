import {AbstractMessage} from "../models/AbstractMessage";
import {IMessageProcessor} from "./IMessageProcessor";

export interface IMessageProcessorFactory<M extends AbstractMessage> {
    get<K extends M>(message: K): IMessageProcessor<K>;
}