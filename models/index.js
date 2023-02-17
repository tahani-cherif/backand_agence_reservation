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
DB.reservation_client_transport=require('./reservation_client_transport')(db, DataTypes)
DB.reservation_client_event=require('./reservation_client_event')(db, DataTypes)
DB.reservation_client_hotel=require('./reservation_client_HOTEL')(db, DataTypes)
DB.reservation_client_programme=require('./reservation_client_programme')(db, DataTypes)
DB.admin=require('./adminModel')(db, DataTypes)

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
  DB.client.belongsTo(DB.user,{foreignkey:'id_user'})
  DB.user.hasMany(DB.client,{foreignkey:'id_user'})
//  DB.client.belongsTo(DB.reservation_evenement,{foreignkey:'id_evenements'})//relation entre table client et reservation evenement 
//  DB.reservation_evenement.hasMany(DB.client,{foreignkey:'id_evenements'})//relation entre table reservation evenement et client 

 //relation table programme
 DB.programme.belongsTo(DB.hotel,{foreignkey: {allowNull: true}})
 DB.hotel.hasMany(DB.programme,{foreignkey: {allowNull: true}})
 DB.programme.belongsTo(DB.bus,{foreignkey: {allowNull: true}})
 DB.bus.hasMany(DB.programme,{foreignkey: {allowNull: true}})
 DB.programme.belongsTo(DB.avion,{foreignkey: {allowNull: true}})
 DB.avion.hasMany(DB.programme,{foreignkey: {allowNull: true}})
 DB.programme.belongsTo(DB.evenement,{foreignkey: {allowNull: true}})
 DB.evenement.hasMany(DB.programme,{foreignkey: {allowNull: true}})
 DB.programme.belongsTo(DB.hotel,{foreignkey: {allowNull: true}})
 DB.hotel.hasMany(DB.programme,{foreignkey: {allowNull: true}})

 // relation de la table reservation  programme
 DB.reservation_tarnsport.hasMany(DB.reservation_client_programme,{foreignkey:'transport'})
 DB.reservation_client_programme.belongsTo(DB.reservation_tarnsport,{foreignkey:'transport'})
 DB.reservation_evenement.hasMany(DB.reservation_client_programme,{foreignkey:'event'})
 DB.reservation_client_programme.belongsTo(DB.reservation_evenement,{foreignkey:'event'})
 DB.client.hasMany(DB.reservation_client_programme,{foreignkey:'client'})
 DB.reservation_client_programme.belongsTo(DB.client,{foreignkey:'client'})
 DB.reservation_hotel.hasMany(DB.reservation_client_programme,{foreignkey:'hotel'})
 DB.reservation_client_programme.belongsTo(DB.reservation_hotel,{foreignkey:'hotel'})
 DB.programme.hasMany(DB.reservation_client_programme,{foreignkey:'hotel'})
 DB.reservation_client_programme.belongsTo(DB.programme,{foreignkey:'hotel'})

// relation de la table chambre
DB.hotel.hasMany(DB.chambre,{foreignkey:'hotel'})
DB.chambre.belongsTo(DB.hotel,{foreignkey:'hotel'})
DB.client.belongsTo(DB.chambre,{foreignkey:'hotel'})
DB.chambre.hasMany(DB.client,{foreignkey:'hotel'})
// relation table reservation hotel
DB.hotel.hasMany(DB.reservation_hotel,{foreignkey:'hotel'})
DB.reservation_hotel.belongsTo(DB.hotel,{foreignkey:'hotel'})
DB.user.hasMany(DB.reservation_hotel,{foreignkey:'hotel'})
DB.reservation_hotel.belongsTo(DB.user,{foreignkey:'hotel'})

// relation reservation client transport

DB.reservation_client_transport.belongsTo(DB.client,{foreignkey:'client'})
DB.client.hasMany(DB.reservation_client_transport,{foreignkey:'client'})
DB.reservation_client_transport.belongsTo(DB.reservation_tarnsport,{foreignkey:'transport'})
DB.reservation_tarnsport.belongsTo(DB.reservation_client_transport,{foreignkey:'transport'})

//  relation table client event
 DB.reservation_client_event.belongsTo(DB.client,{foreignkey:'client'})
 DB.client.hasMany(DB.reservation_client_event,{foreignkey:'client'})
 DB.reservation_evenement.hasMany(DB.reservation_client_event,{foreignkey:'event'})
 DB.reservation_client_event.belongsTo(DB.reservation_evenement,{foreignkey:'event'})
 //  relation table client hotel
 DB.reservation_client_hotel.belongsTo(DB.client,{foreignkey:'client'})
 DB.client.hasMany(DB.reservation_client_hotel,{foreignkey:'client'})
 DB.reservation_hotel.hasMany(DB.reservation_client_hotel,{foreignkey:'hotel'})
 DB.reservation_client_hotel.belongsTo(DB.reservation_hotel,{foreignkey:'hotel'})


DB.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})


module.exports = DB