const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const reservation_tarnsport=Sequelize.define('reservation_tarnsport',{
      type:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
        notNull: {
          msg: 'Please enter your nb place'
        }}
      },
      id_transport:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
          isInt: {
            msg: "Must be an integer number of pennies"
          },
          notNull: {
            msg: 'Please enter your id_transport'
          }
        }
     },
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
          allowNull:false,
          validate:{
            isFloat: {
              msg: "Must be an float number of pennies"
            },
            notNull: {
                msg: 'Please enter your solde'
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
    return reservation_tarnsport
}
