const { Sequelize, DataTypes } = require('sequelize');


module.exports=(Sequelize,DataTypes)=>{
  
    const user=Sequelize.define('user',{
       code_agence:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull: {
            msg: 'Please enter your code'
        }}
       },
       nom_agence:{
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
       password:{
        type:DataTypes.STRING,
        allowNull:false,
         validate: {
           notNull: {
             msg: 'Please enter your password'
            },
            len: { args: 5, msg: 'password length must be more than 5 characters' }
        }
       },
       numero_telephone:{
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
        allowNull:true,
       },
       solde:{
        type:DataTypes.FLOAT,
       },
       credit:{
        type:DataTypes.FLOAT,
       },
       commition_hotel:{
        type:DataTypes.FLOAT,
        validate:{
          isFloat: {
            msg: "Must be an float number of pennies"
          }
        }
       }
       
       
    })
    user.sync({ alter: true })
  return user
}
