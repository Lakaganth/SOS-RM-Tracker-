const nodemailer = require("nodemailer");

const sendEmail = async (recipient, report) => {
  const {
    class_start_time,
    class_end_time,
    coach_arrival_time,
    class_duration
  } = report;
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "carlie20@ethereal.email",
      pass: "xdmJ9JuWAVek57zpAr"
    }
  });

  const message = {
    from: "Sender Name <sender@example.com>",
    to: `Recipient <${recipient}>`,
    subject: "Nodemailer is unicode friendly ✔",
    text: "Hello to myself!",
    html: `<html>
        <body>
        <p>Testing SparkPost - the world's most awesomest email service!</p>
        <a href="${class_start_time}">${class_start_time}</a>
        </body>
        </html>`
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
    }

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

module.exports = sendEmail;
