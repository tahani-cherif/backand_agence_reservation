const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const reservation_evenement=Sequelize.define('reservation_evenement',{
        nb_place:{
           type:DataTypes.INTEGER,
           allowNull:false,
           validate:{
             isInt: {
               msg: "Must be an integer number of pennies"
             },
             notNull: {
               msg: 'Please enter your nb place'
             }
           }
        },
        monatnt_total:{
          type:DataTypes.FLOAT,
          allowNull:false,
          validate:{
            isFloat: {
              msg: "Must be an float number of pennies"
            },
            notNull: {
                msg: 'Please enter your adress'
              }
          }
         },
         solde:{
          type:DataTypes.FLOAT,
          validate:{
            isFloat: {
              msg: "Must be an float number of pennies"
            }
          }
         },
         credit:{
          type:DataTypes.FLOAT,
          validate:{
            isFloat: {
              msg: "Must be an float number of pennies"
            }
          }
         },
        date_debut:{
            type:DataTypes.DATE,
            allowNull:false,
            validate:{
              notNull: {
                msg: 'Please enter your date before'
              }
            }
           },
        date_fin:{
            type:DataTypes.DATE,
            allowNull:false,
            validate:{
              notNull: {
                msg: 'Please enter your date end'
              }
            }
           },
    });
    return reservation_evenement
}
