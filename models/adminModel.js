const { Sequelize, DataTypes } = require('sequelize');


module.exports=(Sequelize,DataTypes)=>{
  
    const admin=Sequelize.define('admin',{
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
       tokens:{
        type:DataTypes.STRING,
       },     },
)
admin.sync({ alter: true })
  return admin
}
