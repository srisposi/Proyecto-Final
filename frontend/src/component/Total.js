import React from "react";
import accounting from "accounting";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { getBasketTotal } from "../reducer";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
// import { createTransport } from "nodemailer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "20 vh",
  },
  button: {
    maxWidth: "200px",
    marginTop: "2rem",
  },
}));

export const Total = () => {
  const classes = useStyles();
  const [{ basket }, dispatch] = useStateValue();
  console.log("basket total", basket);

  // let user = "srisposi7@gmail.com";
  // let pass = "swphtncgmsblndze";

  // let transport = createTransport({
  //   //host,
  //   service: "gmail",
  //   port: 587,
  //   auth: {
  //     user,
  //     pass,
  //   },
  // });
  // console.log(process.argv);
  // let subject = process.argv[2] || "Nuevo Registro";
  // let html =
  //   process.argv[3] ||
  //   `<div><h2>Email</h2><p>Probandeo el Nodemailer</p></div><div>${basket}</div>`;

  // async function sendMessage() {
  //   try {
  //     let params = {
  //       from: "ecommerceAura@gmail.com",
  //       to: user,
  //       subject,
  //       html,
  //       attachments: [
  //         // {
  //         //   path: process.cwd() + "/public/email/theMandalorian.jpg",
  //         // },
  //       ],
  //     };
  //     const response = await transport.sendMail(params);
  //     console.log("Response -> ", response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className={classes.root}>
      <h5>Total items: {basket?.length}</h5>
      <h5> {accounting.formatMoney(getBasketTotal(basket), "$")} </h5>
      <Link to="/checkout">
        <Button
          className={classes.button}
          variant="container"
          color="secondary"
          // onClick={sendMessage()}
        >
          Check out
        </Button>
      </Link>
    </div>
  );
};

export default Total;
