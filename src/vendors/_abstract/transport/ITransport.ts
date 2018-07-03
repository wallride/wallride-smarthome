export interface ITransportPacket<D = any> {
    data: D
}

export interface ITransport<P extends ITransportPacket> {
    setup(callback: Function & {(packet: P): Promise<void>}): Promise<void>;
    send(packet: P): Promise<void>;
}