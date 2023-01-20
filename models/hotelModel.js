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
       prix_chambre_double:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          }
        }
       },
       prix_chambre_single:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          }
        }
       },
       prix_chambre_triple:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          }
        }
       },
       prix_chambre_quadruple:{
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
          }
        }
       },
       prix_pension_complete:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          }
        }
       },
       prix_all_inclusive:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          }
        }
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
        type:DataTypes.JSON,
        defaultValue: JSON.parse(JSON.stringify({
           climatisation:false,
            restaurant:false,
            centreAffaires:false,
            piscine:false,
            television:false,
            boutiqueCadeaux:false,
            change:false,
            bar:false,
            plage:false,
            cafe:false,
            ascenseur:false,
            tennis:false,
            animauxAutorises:false
        }))
       },
       image_hotel:{
        type:DataTypes.JSON
       },
    })
  return hotel
}
