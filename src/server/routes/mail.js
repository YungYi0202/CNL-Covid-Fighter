var nodemailer = require('nodemailer');
exports.sendEmail = async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jerry5841314@gmail.com',
      pass: 'lolsmjrfqdbtsvnb'
    }
  });


  // TODO
  var mailOptions = {
    from: 'jerry5841314@gmail.com',
    to: '123@123',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).json({message: 'error'});
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({message: 'success'});
    }
  });
}