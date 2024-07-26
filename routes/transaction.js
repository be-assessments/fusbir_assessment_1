const express = require('express');
const router = express.Router();

let transactions = [];
let balances = {};

router.post('/transactions', (req, res) => {
    const { payer, points, timestamp } = req.body;

    // Check if it's a single transaction object
    if (payer && points && timestamp) {
        const newTransaction = { payer, points, timestamp: new Date(timestamp) };
        // Add the transaction
        transactions.push(newTransaction);
        // Update the balances
        if (!balances[payer]) {
            balances[payer] = 0;
        }
        balances[payer] += points;
        return res.status(201).send({ message: 'Transaction added', transaction: newTransaction });
    }

    let newTransactions = req.body.transaction;

    // Check if it's an array of transactions
    if (!Array.isArray(newTransactions)) {
        return res.status(400).send({ error: 'Invalid input. Expected a transaction object or an array of transactions.' });
    }

    const invalidTransactions = newTransactions.filter(({ payer, points, timestamp }) => {
        return !payer || !points || !timestamp || isNaN(new Date(timestamp).getTime());
    });

    if (invalidTransactions.length > 0) {
        return res.status(400).send({ error: 'Invalid transaction format. Each transaction must include payer, points, and a valid timestamp.' });
    }

    newTransactions.forEach(({ payer, points, timestamp }) => {
        // Add each transaction
        transactions.push({ payer, points, timestamp: new Date(timestamp) });
        // Update the balances
        if (!balances[payer]) {
            balances[payer] = 0;
        }
        balances[payer] += points;
    });
    res.status(201).send({ message: 'Transactions added', transactions: newTransactions });
});

// Spend points endpoint
router.post('/points/spend', (req, res) => {
    let { points } = req.body;
    const spentPoints = [];
    let deductPoints;
    transactions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    for (let transaction of transactions) {
        if (points <= 0) break;
        if (balances[transaction.payer] > 0) {
            if (balances[transaction.payer] < transaction.points) {
                deductPoints = Math.min(points, balances[transaction.payer]); //Math.min is used to get the minimum value
            }
            else {
                deductPoints = Math.min(points, transaction.points);
            }
            transaction.points -= deductPoints;
            points -= deductPoints;
            //Check if payer is already exist
            const existingPayer = spentPoints.find(p => p.payer === transaction.payer);
            if (existingPayer) {
                existingPayer.points -= deductPoints;
            } else {
                spentPoints.push({ payer: transaction.payer, points: -deductPoints });
            }
            //Returning the total balance
            balances[transaction.payer] -= deductPoints;
        }
    }
    res.status(200).send(spentPoints);
});

// Get balances endpoint
router.get('/balances', (req, res) => {
    res.status(200).send(balances);
});

module.exports = router;
