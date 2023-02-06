const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const avion=Sequelize.define('avion',{
        nom_avion:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
            notNull: {
                msg: 'Please enter your non avion'
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
        point_depart:{
          type:DataTypes.STRING,
          allowNull:false,
          validate:{
          notNull: {
              msg: 'Please enter your point_depart'
            }}
      },
      point_arrive:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
        notNull: {
            msg: 'Please enter your point_arrive'
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
        prix_place_simple:{
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
    return avion
}