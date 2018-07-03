import {MiAbstractMessage} from "../../../../common/messages/MiAbstractMessage";

export class MiDiscoveryGetSubdevicesMessage extends MiAbstractMessage {
    readonly cmd = 'get_id_list';
}