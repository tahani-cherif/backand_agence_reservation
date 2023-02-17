const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const reservation=Sequelize.define('reservation',{
         montant_programme:{
          type:DataTypes.FLOAT,
          allowNull:true,
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
    return reservation
}