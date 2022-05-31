var nodemailer = require('nodemailer');
exports.sendEmail = async (req, res) => {
  const text = "同學您好：\n\n\
  這裡是台大疫情資訊網。通知您，過去某位與您有密切接觸的同學，今日通報確診了。\
  因此您若是發現有發燒、流鼻水、咳嗽、喉嚨痛、倦怠、肌肉痠痛、頭痛、腹瀉、嗅覺或味覺異常、呼吸急促等相關症狀，可進行家用快篩。\
  若出現喘、呼吸困難、持續胸痛、胸悶、意識不清、皮膚或嘴唇或指甲床發青等症狀，\
  應立即聯繫119、衛生局或撥打 1922。\n\n\
  而其它疫情相關，如快篩地圖、確診者足跡等，請上本站查詢。\n\n\
  台大疫情資訊網關心您\n\n\
  ";
  // isSuccess = true;
  const transporter = nodemailer.createTransport({
    pool: true,
    service: 'gmail',
    auth: {
      user: 'jerry5841314@gmail.com',
      pass: 'lolsmjrfqdbtsvnb'
    }
  });
  const messages = [];
  let users = req.body.contactedUsers;

  for(let i = 0; i < users.length; i++) {
    messages.push({
      from: 'jerry5841314@gmail.com',
      to: users[i].email,
      subject: 'Sending Email using Node.js',
      text: users[i].username + text
    });
  }
  
  for(let i = 0; i < messages.length; i++) {
    console.log(messages[i]);
    transporter.sendMail(messages[i], (err, info) => {
      console.log(info.response);
      if(err) {
        console.log(err);
        res.status(500).json({message: 'success'});
      }else {
        res.status(200).json({message: 'success'});
      }
    });
  }
  
}