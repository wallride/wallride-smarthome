import {NetworkAddressType} from "../../../resources/NetworkAddressType";
import {ITransport, ITransportPacket} from "./ITransport";

export interface ITCPTransportPacket<D = Buffer> extends ITransportPacket<D>{
    data: D,
    address: NetworkAddressType
}

export interface ITCPTransport extends ITransport<ITCPTransportPacket>{
}