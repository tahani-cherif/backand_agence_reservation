const express = require('express')
const cors = require('cors')
require('dotenv').config()

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
const routerevenement= require('./routes/evenementroute.js')
const routerreservationbus= require('./routes/reservation_bus_route')
const routerreservationevenement= require('./routes/reservation_evenement_route')
const routerclient= require('./routes/clientroute')
const routeruser= require('./routes/userroute')
const routeravion= require('./routes/avionroute')
const routerprogramme= require('./routes/programmeroute')

app.use('/api/hotel', routerhotel)
app.use('/api/bus', routerbus)
app.use('/api/evenement', routerevenement)
app.use('/api/reservation_bus', routerreservationbus)
app.use('/api/reservation_evenement', routerreservationevenement)
app.use('/api/client', routerclient)
app.use('/api/user', routeruser)
app.use('/api/avion', routeravion)
app.use('/api/programme', routerprogramme)

//static Images Folder

app.use('/image', express.static('./image'))

//test
app.get('/',(req,res)=>{
    res.json({message:'hello from api'})
})

//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    
    console.log(`server is running on port ${PORT}`)
})