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
    desc:{
      type:DataTypes.STRING,
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