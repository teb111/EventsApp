var nodemailer = require("nodemailer");

const sendMail = (event, info) => {
  const { userId, title, geolocation, address, startTime, endTime } = event;

  const { email, userName } = info;

  console.log(email);

  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: `${process.env.SENDER_MAIL}`, // Add your gmail
      pass: `${process.env.SENDER_PASS}`, // Add your gmail password
    },
  });

  var mailOptions = {
    from: `${process.env.SENDER_MAIL}`, //
    to: `${email}`,
    subject: "Welcome to Events",
    text: "Welcome ",
    html: ` <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
    body { font-family: 'Open Sans', sans-serif; 
      letter-spacing: 1.3px; 
    }
    
    h1 {
      text-align: center;
      letter-spacing: 1.6px;
      
    }
    
    span {
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1.5px;
    }
  </style>
  
  
  <p> Hello <span>${info.userName}</span>, You just created an event, Here is the summary of the event you just created </p>
  
  <form>
    <div>
      <h1>  ${title} </h1>
    </div>
     <div>
      <h4> Geolocation: ${geolocation} </h4>
    </div>
     <div>
      <h4> Address: ${address} </h4>
    </div>
      <div>
      <h4> StartTime: ${startTime} </h4>
    </div>
       <div>
      <h4> EndTime: ${endTime} </h4>
    </div>

    
      
    
    
  </form>
     
    `,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = sendMail;
