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
       capacite_chambre_single:{
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
       capacite_chambre_double:{
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
       capacite_chambre_triple:{
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
       capacite_chambre_quadriple:{
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
        defaultValue:0,
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
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          }
        }
       },
       prix_demi_pension:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
        }
       },
       prix_pension_complete:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
        }
       },
       prix_all_inclusive:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
        }
       },
       prix_all_inclusive_soft:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
        }
       },
       prix_all_inclusive_soft:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
        }
       },
       prix_petit_dejeuner:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          },
        }
       },
       type_promotion:{
        type:DataTypes.INTEGER,
       },
        bebe_gratuit:{
        type:DataTypes.INTEGER,
       },
       reduction_enfant:{
        type:DataTypes.FLOAT,
       },
       commision:{
        type:DataTypes.FLOAT,
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
       date_debut_promotion:{
        type:DataTypes.DATE,
       },
       date_fin_promotion:{
        type:DataTypes.DATE,
       },
     
       services_equipements:{
        type:DataTypes.JSON
       },
       image_hotel:{
        type:DataTypes.JSON
       },
       nb_place_reserver_single:{
        type:DataTypes.INTEGER,
        defaultValue:0,
     },
     nb_place_reserver_double:{
      type:DataTypes.INTEGER,
      defaultValue:0,
   },
      nb_place_reserver_triple:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
    nb_place_reserver_quadriple:{
      type:DataTypes.INTEGER,
      defaultValue:0,
    },
    })
  return hotel
}
