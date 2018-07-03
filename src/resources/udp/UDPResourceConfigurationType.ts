import {NetworkAddressType} from "../NetworkAddressType";

export type UDPResourceConfigurationType = {
    uri: string;
    type?: 'udp4' | 'udp6',
    bind: {
        port: number;
        multicast?: {
            membershipHost: string,
            ttl?: number,
            loopback?: boolean;
        }
        reuseAddr?: boolean;
        broadcast?: boolean;
    }
}