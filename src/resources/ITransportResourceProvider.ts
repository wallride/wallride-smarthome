import {ITransportResource} from "./ITransportResource";

export interface ITransportResourceProvider<T> {
    get(uri: string): Promise<ITransportResource<T>>
}