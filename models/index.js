const dbconfig=require("../config/dbConfig.js");
const {Sequelize, DataTypes} = require('sequelize');

const db=new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,
    {
        host:dbconfig.HOST,
        dialect:dbconfig.dialect,
        operatorsAliases:false,
        pool :{
            max:dbconfig.pool.max,
            min:dbconfig.pool.min,
            acquire:dbconfig.pool.acquire,
            idle:dbconfig.pool.idle
        }
    })
    db.authenticate()
    .then(()=>{
        console.log("connected..")
      })
      .catch(err=>{
          console.log("Error"+err)
      })
    const DB={}

DB.Sequelize = Sequelize
DB.sequelize = db

//creation des table

DB.hotel = require('./hotelModel.js')(db, DataTypes)
DB.bus = require('./busModel.js')(db, DataTypes)
DB.evenement = require('./evenementModel.js')(db, DataTypes)
DB.reservation_tarnsport = require('./reservation_transportModel.js')(db, DataTypes)
DB.reservation_evenement = require('./reservation_evenementModel.js')(db, DataTypes)
DB.client = require('./clientModel.js')(db, DataTypes)
DB.user = require('./userModel.js')(db, DataTypes)
DB.avion = require('./avionModel.js')(db, DataTypes)
DB.programme = require('./programme')(db, DataTypes)
DB.reservation = require('./reservationModale')(db, DataTypes)
DB.chambre = require('./chambreModel')(db, DataTypes)
DB.reservation_hotel = require('./reservationhotelModel')(db, DataTypes)

//relation entre les tableau

// relation de la table reservation transport
 DB.user.hasMany(DB.reservation_tarnsport,{foreignkey:'user'})//relation entre table user et reservation 
 DB.reservation_tarnsport.belongsTo(DB.user,{foreignkey:'user'})//relation entre table reservation et user 

 // relation de la table reservation evenement
 DB.evenement.hasMany(DB.reservation_evenement,{foreignkey:'id_evenement'})// relation de table evenement avec reservation_evenement plusieur evenement peut reserver
 DB.reservation_evenement.belongsTo(DB.evenement,{foreignkey:'id_evenement'})// relation de table  reservation_evenement avec evenement une seul evenement a reserver
 DB.user.hasMany(DB.reservation_evenement,{foreignkey:'id_user'})//relation entre table user et reservation_evenement 
 DB.reservation_evenement.belongsTo(DB.user,{foreignkey:'id_user'})//relation entre table reservation_evenement et user 

 //relation table client
//  DB.client.belongsTo(DB.reservation_bus,{foreignkey:'id_evenement'})//relation entre table client et reservation bus 
//  DB.reservation_bus.hasMany(DB.client,{foreignkey:'id_evenement'})//relation entre table client et reservation bus
//  DB.client.belongsTo(DB.reservation_evenement,{foreignkey:'id_evenements'})//relation entre table client et reservation evenement 
//  DB.reservation_evenement.hasMany(DB.client,{foreignkey:'id_evenements'})//relation entre table reservation evenement et client 

 //relation table programme
 DB.programme.belongsTo(DB.hotel,{foreignkey:'id_hotel'})
 DB.hotel.hasMany(DB.programme,{foreignkey:'id_hotel'})
 DB.programme.belongsTo(DB.bus,{foreignkey:'id_bus'})
 DB.bus.hasMany(DB.programme,{foreignkey:'id_bus'})
 DB.programme.belongsTo(DB.avion,{foreignkey:'id_avion'})
 DB.avion.hasMany(DB.programme,{foreignkey:'id_avion'})
 DB.programme.belongsTo(DB.evenement,{foreignkey:'id_event'})
 DB.evenement.hasMany(DB.programme,{foreignkey:'id_event'})
 DB.programme.belongsTo(DB.hotel,{foreignkey:'id_hotel'})
 DB.hotel.hasMany(DB.programme,{foreignkey:'id_hotel'})

 // relation de la table reservation 
 DB.reservation_tarnsport.hasMany(DB.reservation,{foreignkey:'transport'})
 DB.reservation.belongsTo(DB.reservation_tarnsport,{foreignkey:'transport'})
 DB.reservation_evenement.hasMany(DB.reservation,{foreignkey:'event'})
 DB.reservation.belongsTo(DB.reservation_evenement,{foreignkey:'event'})
 DB.client.hasMany(DB.reservation,{foreignkey:'client'})
 DB.reservation.belongsTo(DB.client,{foreignkey:'client'})

// relation de la table chambre
DB.hotel.hasMany(DB.chambre,{foreignkey:'hotel'})
DB.chambre.belongsTo(DB.hotel,{foreignkey:'hotel'})
DB.client.belongsTo(DB.chambre,{foreignkey:'hotel'})
DB.chambre.hasMany(DB.client,{foreignkey:'hotel'})

// relation table reservation hotel
DB.reservation.belongsTo(DB.hotel,{foreignkey:'hotel'})
DB.hotel.hasMany(DB.reservation_hotel,{foreignkey:'hotel'})
DB.user.hasMany(DB.reservation_hotel,{foreignkey:'id_user'})
DB.reservation_hotel.belongsTo(DB.user,{foreignkey:'id_user'})



DB.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})


module.exports = DB