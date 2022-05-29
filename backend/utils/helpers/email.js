const { createTransport } = require("nodemailer");
// let host = "smtp.ethereal.email";
// let user = "rosina.hoeger98@ethereal.email";
// let pass = "tfChJ1eDZ8K3jXRwKE";
const { email } = require("../../config/index");
let user = email.userEmail;
let pass = email.passwordEmail;

let transport = createTransport({
  //host,
  service: "gmail",
  port: 587,
  auth: {
    user,
    pass,
  },
});
console.log(process.argv);
let subject = process.argv[2] || "Nuevo Registro";
let html =
  process.argv[3] || "<div><h2>Email</h2><p>Probandeo el Nodemailer</p></div>";

// async () => {
//   try {
//     let params = {
//       from: "Ecommerce Aura TE da la Bienvenida",
//       to: user,
//       subject,
//       html,
//       attachments: [
//         {
//           path: "theMandalorian.jpg",
//         },
//       ],
//     };
//     const response = await transport.sendMail(params);
//     console.log("Response -> ", response);
//   } catch (error) {
//     console.log(error);
//   }
// };

class Email {
  async generateEmail() {
    try {
      let params = {
        from: "ecommerceAura@gmail.com",
        to: user,
        subject,
        html,
        attachments: [
          {
            path: process.cwd() + "/public/email/theMandalorian.jpg",
          },
        ],
      };
      const response = await transport.sendMail(params);
      console.log("Response -> ", response);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Email;
