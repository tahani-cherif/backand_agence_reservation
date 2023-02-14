const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/busroute.js','./routes/avionroute.js','./routes/hotelroute.js','./routes/evenementroute.js',
'./routes/programmeroute.js','./routes/reservation_tarnsport_route.js','./routes/reservation_evenement_route.js','./routes/reservation_hotel.js',
'./routes/reservationroute.js','./routes/chambreroute.js','./routes/clientroute.js','./routes/emailrout.js','./routes/RCEroute.js',
'./routes/RCHROUTE.js','./routes/RCTroute.js','./routes/userroute.js']

swaggerAutogen(outputFile, endpointsFiles)