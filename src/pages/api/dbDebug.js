const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    return dbDebugGet(req, res)
}

async function dbDebugGet(req,res){
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the states
        let states = await db
            .collection('states')
            .find({})
            .sort({ published: -1 })
            .toArray();

        // return the states
        return res.json({
            message: JSON.parse(JSON.stringify(states)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

