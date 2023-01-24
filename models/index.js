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
DB.reservation_bus = require('./reservation_busModel.js')(db, DataTypes)
DB.reservation_evenement = require('./reservation_evenementModel.js')(db, DataTypes)
DB.client = require('./clientModel.js')(db, DataTypes)
DB.user = require('./userModel.js')(db, DataTypes)

//relation entre les tableau

// relation de la table reservation bus
 DB.bus.hasMany(DB.reservation_bus,{foreignkey:'id_bus'})// relation de table bus avec reservationbus plusieur bus peut reserver
 DB.reservation_bus.belongsTo(DB.bus,{foreignkey:'id_bus'})// relation de table  reservationbus avec bus une seul bus a reserver
 DB.user.hasMany(DB.reservation_bus,{foreignkey:'user'})//relation entre table user et reservation 
 DB.reservation_bus.belongsTo(DB.user,{foreignkey:'user'})//relation entre table reservation et user 

 // relation de la table reservation evenement
 DB.evenement.hasMany(DB.reservation_evenement,{foreignkey:'id_evenement'})// relation de table evenement avec reservation_evenement plusieur evenement peut reserver
 DB.reservation_evenement.belongsTo(DB.evenement,{foreignkey:'id_evenement'})// relation de table  reservation_evenement avec evenement une seul evenement a reserver
 DB.user.hasMany(DB.reservation_evenement,{foreignkey:'id_user'})//relation entre table user et reservation_evenement 
 DB.reservation_evenement.belongsTo(DB.user,{foreignkey:'id_user'})//relation entre table reservation_evenement et user 

 //relation table client
 DB.client.belongsTo(DB.reservation_bus,{foreignkey:'id_evenement'})//relation entre table client et reservation bus 
 DB.reservation_bus.hasMany(DB.client,{foreignkey:'id_evenement'})//relation entre table client et reservation bus
 DB.client.belongsTo(DB.reservation_evenement,{foreignkey:'id_evenements'})//relation entre table client et reservation evenement 
 DB.reservation_evenement.hasMany(DB.client,{foreignkey:'id_evenements'})//relation entre table reservation evenement et client 



 DB.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})


module.exports = DB