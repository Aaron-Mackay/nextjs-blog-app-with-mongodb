const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    console.log(req.body)
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getStates(req, res);
        }

        case 'POST': {
            return addState(req, res);
        }

        case 'PUT': {
            return updateState(req, res);
        }

        case 'DELETE': {
            return deleteState(req, res);
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
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function updateState(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();

        // update the published status of the state
        await db.collection('states').updateOne(
            {
                _id: new ObjectId(req.body),
            },
            { $set: { published: true } }
        );

        // return a message
        return res.json({
            message: 'State updated successfully',
            success: true,
        });
    } catch (error) {

        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function deleteState(req, res) {
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();
        // Deleting the state
        await db.collection('states').deleteOne({
            _id: new ObjectId(req.query.stateId),
        });

        // returning a message
        return res.json({
            message: 'State deleted successfully',
            success: true,
        });
    } catch (error) {
        console.log(error)
        // returning an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}