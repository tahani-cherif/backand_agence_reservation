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
        e_mail:{
            type:DataTypes.STRING,
            validate:{
             isEmail : true,}
            },
        cin:{
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
               },
        date_naissance:{
            type:DataTypes.DATE,
            allowNull:false,
            validate:{
             notNull: {
                msg: 'Please enter your date naissance'
                }
                }
               },
        montant_hotel:{
          type:DataTypes.FLOAT,
          allowNull:true,
          validate:{
            isFloat: {
              msg: "Must be an float number of pennies"
            }
          }
         },
         montant_bus:{
            type:DataTypes.FLOAT,
            allowNull:true,
            validate:{
              isFloat: {
                msg: "Must be an float number of pennies"
              }
            }
           },
           montant_evenement:{
            type:DataTypes.FLOAT,
            allowNull:true,
            validate:{
              isFloat: {
                msg: "Must be an float number of pennies"
              }
            }
           },
       
    });
    return client
}