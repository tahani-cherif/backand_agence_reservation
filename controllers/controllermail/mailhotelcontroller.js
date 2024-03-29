const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'dzagence.responsable@gmail.com',
      pass: 'tganrframyvwatfc',
    },
  });


  const sendEmailreservationhotel = async (req, res) => {
 
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a body to create',
      });
    }

    let desc=`<div>
    <h3>Reservation de agence ${body.nom_agence}</h3>
    <p>agance ${body.nom_agence} reserver ${body.nb_chambre} pendant ${body.nb_nuit} jour  chambre ${body.type} a ${body.nb_client} clients </p>
    `
    if(parseInt(body.enfant_gratuit)===1)
    {
      desc+=`<p>avec un enfant bebe -2ans</p>`
    }
    desc+=`<p>date de reservation : ${body.date_debut} --> ${body.date_fin}</p>
    </div>`
      const mailOptionsTransmissions = {
        from: 'dzagence.responsable@gmail.com',
        to:body.email,
        html: desc,
        subject: 'Reservation chambre dans Hotel'
      };
      transporter.sendMail(
        mailOptionsTransmissions,
        function (error, response) {
          if (error) {
            return res.status(400).json({
              success: false,
              data: error,
            });
          } else {
            return res.status(200).json({
              success: true,
              data: 'Email sent',
            });
          }
        }
      );
  };
  
  const sendEmailconfirmationreservationhotelagence = async (req, res) => {
 
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a body to create',
      });
    }
      const mailOptionsTransmissions = {
        from: 'dzagence.responsable@gmail.com',
        to:body.email,
        html: ` <div>
                   <h3>Reservation de agence ${body.nom_agence}</h3>
                   <p>reservation dans hotel ${body.nom_hotel} reserver avec sucsce</p>
                   <p>date de reservation : ${body.date_debut} --> ${body.date_fin}</p>

                </div>`,
        subject: 'Reservation chambre dans Hotel'
      };
      transporter.sendMail(
        mailOptionsTransmissions,
        function (error, response) {
          if (error) {
            return res.status(400).json({
              success: false,
              data: error,
            });
          } else {
            return res.status(200).json({
              success: true,
              data: 'Email sent',
            });
          }
        }
      );
  };

module.exports={
    sendEmailreservationhotel,
    sendEmailconfirmationreservationhotelagence
}