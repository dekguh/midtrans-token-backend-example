const midtransClient = require('midtrans-client')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Mars perut bunyi')
})

app.post('/generate-trx-token', (req, res) => {
    let snap = new midtransClient.Snap({
        isProduction: false, // test mode
        serverKey: 'SB-Mid-server-_U-WFJExvm0FQNgdTACTifVB', // sandbox test key
        clientKey: 'SB-Mid-client-HQRi-2dR1jtg0jC8', // sandbox test key
    })

    const parameterSnap = {
        transaction_details: {
            order_id: req.body.orderId,
            gross_amount: req.body.grossAmount
        }
    }
    snap.createTransaction(JSON.stringify(parameterSnap))
    .then((transaction)=>{
        res.json(transaction)
    })
})

app.listen(port)