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
        numero_passport:{
              type:DataTypes.BIGINT,
              unique: true,
              allowNull:false,
              validate:{
                notNull: {
                   msg: 'Please enter your date naissance'
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
               }
       
    });
    return client
}