const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const reservation_client_event=Sequelize.define('reservation_client_event',{
    });
    return reservation_client_event
}