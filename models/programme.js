const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const programme=Sequelize.define('programme',{
        nom_programme:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
            notNull: {
                msg: 'Please enter your non programme'
              }}
        },
        nom_hotel:{
          type:DataTypes.STRING,
      },
      nom_evenement:{
        type:DataTypes.STRING,
    },
    matricule:{
      type:DataTypes.STRING,
  },
  reference_avion:{
    type:DataTypes.STRING,
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
      image_programme:{
            type:DataTypes.JSON
          },
          point_depart:{
            type:DataTypes.STRING,},
        point_arrive:{
          type:DataTypes.STRING,
      },
    });
    return programme
}