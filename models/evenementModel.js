const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const evenement=Sequelize.define('evenement',{
        nom_evenement:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
            notNull: {
                msg: 'Please enter your name evenement'
              }}
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notNull: {
                    msg: 'Please enter your description'
                  }}
        },
        nb_place:{
           type:DataTypes.INTEGER,
           allowNull:false,
           validate:{
             isInt: {
               msg: "Must be an integer number of pennies"
             },
             notNull: {
               msg: 'Please enter your nombre place'
             }
           }
        },
        nb_place_reserver:{
          type:DataTypes.INTEGER,
          allowNull:true,
          defaultValue:0,
          validate:{
            isInt: {
              msg: "Must be an integer number of pennies"
            }
          }
       },
        prix_evenement:{
          type:DataTypes.FLOAT,
          allowNull:false,
          validate:{
            isFloat: {
              msg: "Must be an float number of pennies"
            },
            notNull: {
              msg: 'Please enter your price evenement'
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
        image_evenement:{
          type:DataTypes.JSON
        }
    });
    return evenement
}