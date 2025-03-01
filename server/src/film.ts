import * as mongodb from "mongodb";

export interface Film {
    name: string;
    release_date: string;
    type: "horreur" | "comedie" | "action";
    _id?: mongodb.ObjectId;
}