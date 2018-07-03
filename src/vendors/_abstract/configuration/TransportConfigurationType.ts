import {UDPTransportOptions} from "../transport/udp/UDPTransport";

export type TransportConfigurationType = UDPTransportConfigurationType


export type UDPTransportConfigurationType = {type: 'udp'} & UDPTransportOptions