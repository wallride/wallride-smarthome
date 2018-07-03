import {MiAbstractMessage} from "../../MiAbstractMessage";

export class MiDiscoveryReadDeviceMessage extends MiAbstractMessage {
    readonly cmd = 'read';

    constructor(public sid?: string){ super() }
}