const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const reservation_client_transport=Sequelize.define('reservation_client_transport',{
    });
    return reservation_client_transport
}