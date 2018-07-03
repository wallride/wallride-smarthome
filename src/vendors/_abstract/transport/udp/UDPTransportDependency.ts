import * as di from '@ips.su/di'

import {UDPSocketResourceProvider} from "../../../../resources/udp/UDPSocketResourceProvider";

export class UDPTransportDependency implements di.Injectable{
    resourceProvider: UDPSocketResourceProvider = null;

    isValid(): boolean {
        return !!(this.resourceProvider)
    }
}