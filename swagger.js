const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/avionroute.js']

swaggerAutogen(outputFile, endpointsFiles)