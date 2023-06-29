import * as querystring from "querystring";

const {connectToDatabase} = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return getUserVotes(req, res)
    }
    if (req.method === 'PATCH') {
        return submitVote(req, res);
    }
    return res.status(405).send();
}

async function getUserVotes(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the states
        const userEmail = querystring.parse(req.url.replace('/api/vote?','')).user
        let userVotes = await db
            .collection('votes')
            .find({
                userEmail
            })
            .sort({ published: -1 })
            .toArray();
        // return the states
        return res.json({
            message: JSON.parse(JSON.stringify(userVotes)),
            success: true,
        });
    } catch (error) {
        console.log("Error: ", error)
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function submitVote(req, res) {
    try {
        // connect to the database
        let {db} = await connectToDatabase();
        const {state, vote, category, lastVoted, userEmail} = JSON.parse(req.body)

        // update the published status of the state
        await db.collection('votes').updateOne(
            {
                state,
                category,
                userEmail
            },
            {$set: {lastVoted, vote}},
            {upsert: true}
        );
        // return a message


        return res.json({
            message: 'Voted successfully',
            success: true,
        });
    } catch (error) {
        console.log("Error: ", error)
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}