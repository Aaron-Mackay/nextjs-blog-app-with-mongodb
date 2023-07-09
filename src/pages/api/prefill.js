const fs = require('fs');
const csv = require('csv-parser');

const {connectToDatabase} = require('../../lib/mongodb');

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        return submitPrefilledVotes(req, res);
    }
    return res.status(405).send();
}

async function submitPrefilledVotes(req, res) {
    try {
        const {lastVoted, userEmail} = JSON.parse(req.body)
        const safeStates = await readCSVFile("src/lib/safe-states.csv")
        const safeStateOps = safeStates.map(({state, vote}) => {
            return {
                updateOne: {
                    filter: {
                        state,
                        category: "pres",
                        userEmail
                    },
                    update: {$set: {lastVoted, vote}},
                    upsert: true
                }
            }
        })

        // connect to the database
        let {db} = await connectToDatabase();

        await db.collection('votes').bulkWrite(safeStateOps)
        // return a message


        return res.json({
            message: 'Prefilled votes successfully',
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

async function readCSVFile(filePath) {
    try {
        const results = [];

        const stream = fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                results.push(data);
            });

        await new Promise((resolve, reject) => {
            stream.on('end', resolve);
            stream.on('error', reject);
        });

        return results;
    } catch (error) {
        console.error('Error reading CSV file:', error);
        throw error;
    }
}