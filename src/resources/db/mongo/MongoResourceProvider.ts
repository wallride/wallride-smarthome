import {MongoClient} from 'mongodb'
import {BaseError} from "../../../BaseError";
import {MongoConnectionResource} from "./MongoConnectionResource";

import {MongoResourceConfigurationType} from "./MongoResourceConfigurationType";

export class MongoResourceProvider {
    protected uriConfigurations = new Map<string, MongoResourceConfigurationType>();
    protected uriResources = new Map<string, MongoConnectionResource>();

    constructor(protected configurations: MongoResourceConfigurationType[] = []){
        for (const config of configurations) this.uriConfigurations.set(config.uri, config);
    }

    async getResource(uri: string): Promise<MongoConnectionResource> {
        if (this.uriResources.has(uri)) return this.uriResources.get(uri);

        const config = this.uriConfigurations.get(uri);
        if (!config) throw new BaseError(this, 'No configuration for URI', uri);

        let resource: MongoConnectionResource;
        let connection: MongoClient;
        try {
            connection = await MongoClient.connect(config.connection.uri, config.connection.options);
            resource = new MongoConnectionResource(uri, connection);
        } catch (e) { throw new BaseError(this, 'Connection failed', e).addItem('uri', uri); }

        this.uriResources.set(uri, resource);

        return resource;
    }
}