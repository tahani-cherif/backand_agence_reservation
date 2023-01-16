const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const bus=Sequelize.define('bus',{
        matricule:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
            notNull: {
                msg: 'Please enter your matricule'
              }}
        },
        reference:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notNull: {
                    msg: 'Please enter your reference'
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
        prix_place:{
          type:DataTypes.FLOAT,
          allowNull:false,
          validate:{
            isFloat: {
              msg: "Must be an float number of pennies"
            },
            notNull: {
              msg: 'Please enter your nombre place'
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
    return bus
}