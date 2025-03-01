import * as mongodb from "mongodb";
import { Film } from "./film";
import { release } from "os";

export const collections: {
    films?: mongodb.Collection<Film>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("stream_platform");
    await applySchemaValidation(db);

    const filmsCollection = db.collection<Film>("films");
    collections.films = filmsCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "release_date", "type"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                release_date: {
                    bsonType: "string",
                    description: "'release_date' is required and is a string",
                },
                type: {
                    bsonType: "string",
                    description: "'type' is required and is one of 'horreur', 'comedie', or 'action'",
                    enum: ["horreur", "comedie", "action"],
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
        collMod: "films",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("films", {validator: jsonSchema});
        }
    });
}