const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const reservation_client_programme=Sequelize.define('reservation_client_programme',{
        montant_total:{
            type:DataTypes.FLOAT,
            allowNull:false,
            validate:{
              isFloat: {
                msg: "Must be an float number of pennies"
              },
              notNull: {
                  msg: 'Please enter your MT'
                }
            }
           },
    });
    return reservation_client_programme
}