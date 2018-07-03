import {MongoClientOptions} from "mongodb";

export type MongoResourceConfigurationType = {
    uri: string;
    connection: {
        uri: string,
        options?: MongoClientOptions
    }
}