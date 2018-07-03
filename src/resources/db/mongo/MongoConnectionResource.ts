import {MongoClient} from "mongodb";
import {MongoDBResource} from "./MongoDBResource";

export class MongoConnectionResource {
    protected dbResources = new Map<string, MongoDBResource>();

    constructor(protected uri, protected connection: MongoClient) {}


    async getDB(name: string): Promise<MongoDBResource> {
        if (this.dbResources.has(name)) return this.dbResources.get(name);

        const db = this.connection.db(name);
        const resource = new MongoDBResource(this.uri, name, db);
        this.dbResources.set(name, resource);

        return resource;
    }
}