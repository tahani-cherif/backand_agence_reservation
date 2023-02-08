const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
  
    const agence=Sequelize.define('agence',{
       code_agence : {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull: {
            msg: 'Please enter your code'
        }}
       },
       nom_agence : {
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
       cp_agence:{
        type:DataTypes.STRING,
        allowNull:false,
       },
       
       
    })
  return agence
}
