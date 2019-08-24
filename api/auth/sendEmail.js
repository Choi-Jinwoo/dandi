const nodemailer = require('nodemailer');
const emailInfo = require("../../config/emailInfo");

module.exports = function (req) {
    const req_email = req.body.user_email;
    const randomCode = makeRandomCode();
    
    const transporter = nodemailer.createTransport({
        service : "Gmail",
        auth : {
            user : emailInfo.id, //google id
            pass : emailInfo.pw, //google pw
            domain : ""
        }
    })

    const mailOptions = {
        from : emailInfo.id, //google id
        to : req_email,
        subject : "[schooler] 이메일 인증", //title
        text : randomCode //content
    }

    return new Promise ((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("이메일 전송중 오류 발생\n" + err);
                reject(err);
            } else {
                console.log(`이메일 전송 완료 code : ${randomCode}`);
                resolve(randomCode);
            }
            
        })
    })
}

function makeRandomCode() {
    let code = "";
    const code_length = 10;
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

    for (let i = 0; i < code_length; i++) {
        const rnum = Math.floor(Math.random() * chars.length);
        code += chars.substring(rnum, rnum + 1);
    }

    return code;
}