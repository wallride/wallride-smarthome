import {URL} from "url";
import {NetworkAddressType} from "../NetworkAddressType";

export type UDPSocketSendOptionsType = {
    data: Buffer;
    address: NetworkAddressType;
}
