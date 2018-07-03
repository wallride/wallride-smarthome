import {Db} from "mongodb";

import {MongoCollectionResource} from "./MongoCollectionResource";

export class MongoDBResource {
    protected collectionResources = new Map<string, MongoCollectionResource>();

    constructor(protected uri, protected dbName: string, protected db: Db) {}

    async getCollection<Schema = any>(name: string): Promise<MongoCollectionResource<Schema>> {
        if (this.collectionResources.has(name)) return this.collectionResources.get(name);

        const collection = this.db.collection<Schema>(name);
        const resource = new MongoCollectionResource(this.uri, this.dbName, name, collection);
        this.collectionResources.set(name, resource);

        return resource;
    }
}