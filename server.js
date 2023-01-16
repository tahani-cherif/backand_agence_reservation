const express = require('express')
const cors = require('cors')

const app = express()
const corOptions={
    origin:'https://localhost:8080'
}

app.use(cors());

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
const routerhotel = require('./routes/hotelroute.js')
const routerbus= require('./routes/busroute.js')
app.use('/api/hotel', routerhotel)
app.use('/api/bus', routerbus)
//test
app.get('/',(req,res)=>{
    res.json({message:'hello from api'})
})

// //port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    
    console.log(`server is running on port ${PORT}`)
})