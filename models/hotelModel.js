const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
  
    const hotel=Sequelize.define('hotel',{
       nom_hotel : {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull: {
            msg: 'Please enter your name'
        }}
       },
       e_mail:{
        type:DataTypes.STRING,
        isUnique :true,
        allowNull:false,
        validate:{
         isEmail : true,
         notNull: {
          msg: 'Please enter your e_mail'
        }
           }
       },
       numero_telephone : {
        type:DataTypes.BIGINT,
        allowNull:false,
        validate:{
          notNull: {
            msg: 'Please enter your phone number'
        }}
       },
       adresse:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull: {
            msg: 'Please enter your adresse'
        }}
       },
       nb_etoile:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
          isInt: {
            msg: "Must be an integer number of pennies"
          },
          notNull: {
            msg: 'Please enter your nb star'
          }
        }
       },
       capacite:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
          isInt: {
            msg: "Must be an integer number of pennies"
          },
          notNull: {
            msg: 'Please enter your  capacite'
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
       porcentage_chambre_triple:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
          
        }
       },
       porcentage_chambre_quadruple:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          }
        }
       },
       frais_chambre_single:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
          notNull: {
            msg: 'Please enter your frais single'
        }
        }
       },
       prix_demi_pension:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
          notNull: {
            msg: 'Please enter your prix DP'
        }
        }
       },
       prix_pension_complete:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
          notNull: {
            msg: 'Please enter your prix pc'
        }
        }
       },
       prix_all_inclusive:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
          notNull: {
            msg: 'Please enter your prix AL'
        }
        }
       },
       prix_all_inclusive_soft:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
          notNull: {
            msg: 'Please enter your prix ALs'
        }
        }
       },
        enfant_gratuit:{
        type:DataTypes.INTEGER,
       },
       commision:{
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
     
       services_equipements:{
        type:DataTypes.JSON
       },
       image_hotel:{
        type:DataTypes.JSON
       },
    })
  return hotel
}
