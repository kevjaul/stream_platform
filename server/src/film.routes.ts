import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const filmRouter = express.Router();
filmRouter.use(express.json());

filmRouter.get("/", async (_req, res) => {
    try {
        const films = await collections?.films?.find({}).toArray();
        res.status(200).send(films);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

filmRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const film = await collections?.films?.findOne(query);

        if (film) {
            res.status(200).send(film);
        } else {
            res.status(404).send(`Failed to find a film: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a film: ID ${req?.params?.id}`);
    }
});

filmRouter.post("/", async (req, res) => {
    try {
        const film = req.body;
        const result = await collections?.films?.insertOne(film);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new film: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new film.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

filmRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const film = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.films?.updateOne(query, { $set: film });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a film: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a film: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a film: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

filmRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.films?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a film: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a film: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a film: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});