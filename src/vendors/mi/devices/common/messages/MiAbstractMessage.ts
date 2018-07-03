import {AbstractMessage} from "../../../../_abstract/devices/messages/models/AbstractMessage";

export abstract class MiAbstractMessage extends AbstractMessage{
    cmd: string;
}
