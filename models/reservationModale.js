const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const reservation=Sequelize.define('reservation',{
      montant_hotel:{
        type:DataTypes.FLOAT,
        allowNull:true,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          }
        }
       },
       montant_transport:{
          type:DataTypes.FLOAT,
          allowNull:true,
          validate:{
            isFloat: {
              msg: "Must be an float number of pennies"
            }
          }
         },
         montant_evenement:{
          type:DataTypes.FLOAT,
          allowNull:true,
          validate:{
            isFloat: {
              msg: "Must be an float number of pennies"
            }
          }
         },
         montant_programme:{
          type:DataTypes.FLOAT,
          allowNull:true,
          validate:{
            isFloat: {
              msg: "Must be an float number of pennies"
            }
          }
         },
    });
    return reservation
}