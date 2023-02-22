const {Sequelize,DataTypes}=require('sequelize');

module.exports=(Sequelize,DataTypes)=>{
   
    const client=Sequelize.define('client',{
        full_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
            notNull: {
                msg: 'Please enter your full name'
              }}
        },
        type:{
            type:DataTypes.STRING,
        },
        age : {
            type:DataTypes.INTEGER,
              }
       
    });
    return client
}