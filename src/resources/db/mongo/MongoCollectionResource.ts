import {Collection, FilterQuery, FindOneOptions, CollectionInsertOneOptions} from "mongodb";

export class MongoCollectionResource<Schema = any> {
    constructor(protected uri, protected dbName: string, protected collectionName: string, public collection: Collection<Schema>) {}

    find<O = Schema>(query: FilterQuery<any> = {}, projection?: Object): Promise<O[]> {
        return new Promise((done, fail) => {
            let cursor = this.collection.find<O>(query);
            if (projection) cursor = cursor.project(projection);
            cursor.toArray((err, items) => {
                if (err) return fail(err);

                done(items);
            })

        })
    }

    async insert(record: Schema, options?: CollectionInsertOneOptions): Promise<void> {
        await this.collection.insertOne(record, options)
    }


}