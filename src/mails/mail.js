var nodemailer = require("nodemailer");

const sendMail = (user) => {
  const { _id, email, token, name } = user;
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
    html: `<style>
    body{
      margin: 0 auto;
      padding: 100px;
    }
  h3  {
    color: black; 
    font-size: 32px;
    }
  p    
  </style>
  
  <h3>Hello there ${name}</h3> </b> 
      <p>Welcome to Events, we are so happy to have you onboard</p>
  
  <img src="https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg" width="150" height="150" />`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = sendMail;
