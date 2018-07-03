export interface ITransportResource<T> {
    getURI(): string
    send({data: T}): Promise<void>
    subscribe(callback: {(data:T): Promise<void>}): this
    onClose(callback: Function): this
    isAlive(): boolean;
    release(): Promise<void>
}
