var nodemailer = require("nodemailer");

const passwordResetMail = (user) => {
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
    html: `
  <h3>Hello there ${name}</h3> </b>
  <p> This link expires in <strong>3 Minutes</strong></p>
  Click on the link below to continue reseting your password</b><br>
   <a href="http://localhost:5000/api/user/${token}/${_id}/resetPassword"><h3>Continue</h3></a> 
      `,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = passwordResetMail;
