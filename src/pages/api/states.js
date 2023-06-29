const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getStates(req, res);
        }

        case 'POST': {
            return addState(req, res);
        }
    }
}

async function getStates(req,res){
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
        console.log("Error: ", error)
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function addState(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the state
        await db.collection('states').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'State added successfully',
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
