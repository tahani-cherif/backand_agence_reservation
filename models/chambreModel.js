const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const chambre=Sequelize.define('chambre',{
        type:{
            type:DataTypes.INTEGER,
        },
        type_logmenet:{
          type:DataTypes.STRING,
         },
        bebe:{
          type:DataTypes.INTEGER,
        },
        type_personne:{
          type:DataTypes.JSON
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
        montant:{
          type:DataTypes.FLOAT,
          allowNull:false,
          validate:{
            notNull: {
              msg: 'Please enter your MT'
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
           nb_nuit:{
            type:DataTypes.INTEGER
          },
    });
    return chambre
}