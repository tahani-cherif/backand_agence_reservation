const express = require('express')
const cors = require('cors')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


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
const routerreservationbus= require('./routes/reservation_tarnsport_route')
const routerreservationevenement= require('./routes/reservation_evenement_route')
const routerclient= require('./routes/clientroute')
const routeruser= require('./routes/userroute')
const routeravion= require('./routes/avionroute')
const routerprogramme= require('./routes/programmeroute')
const routerreservation= require('./routes/reservationroute')
const routerchambre= require('./routes/chambreroute')
const routerreservationhotel= require('./routes/reservation_hotel')
const routerreservationRCT=require('./routes/RCTroute')
const routerreservationRCE=require('./routes/RCEroute')
const routerreservationRCH=require('./routes/RCHROUTE')
const routeremail=require('./routes/emailrout')

app.use('/api/hotel', routerhotel)
app.use('/api/bus', routerbus)
app.use('/api/evenement', routerevenement)
app.use('/api/reservation_transport', routerreservationbus)
app.use('/api/reservation_evenement', routerreservationevenement)
app.use('/api/client', routerclient)
app.use('/api/user', routeruser)
app.use('/api/avion', routeravion)
app.use('/api/programme', routerprogramme)
app.use('/api/reservation', routerreservation)
app.use('/api/chambre', routerchambre)
app.use('/api/reservation_hotel', routerreservationhotel)
app.use('/api/RCT', routerreservationRCT)
app.use('/api/RCE', routerreservationRCE)
app.use('/api/RCH', routerreservationRCH)
app.use('/api/mail', routeremail)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

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