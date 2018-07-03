import {NetworkAddressType} from "../NetworkAddressType";

export type UDPResourceDataConsumerType = Function & { (data: Buffer, remoteAddress: NetworkAddressType): Promise<void> }