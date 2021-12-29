import React, { useState,useEffect } from "react";
import { BookCar } from "../../apiCalls/auth";
import moment from "moment";
import Axios from "axios";
const server = "http://127.0.0.1:8000";


const App = (props) => {
    console.log(props.location.state)
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  const handleSuccess = (res) => {
    // separate key and values from the res object which is nothing but param_dict
    let keyArr = Object.keys(res);
    let valArr = Object.values(res);

    // when we start the payment verification we will hide our Product form

    // Lets create a form by DOM manipulation
    // display messages as soon as payment starts

    // document.querySelector('.footer-container').style.display='none'
    let heading1 = document.createElement("h1");
    heading1.innerText = "Redirecting you to the paytm....";
    let heading2 = document.createElement("h1");
    heading2.innerText = "Please do not refresh your page....";

    //create a form that will send necessary details to the paytm
    let frm = document.createElement("form");
    frm.action = "https://securegw-stage.paytm.in/order/process/";
    frm.method = "post";
    frm.name = "paytmForm";

    // we have to pass all the credentials that we've got from param_dict
    keyArr.map((k, i) => {
      // create an input element
      let inp = document.createElement("input");
      inp.key = i;
      inp.type = "hidden";
      // input tag's name should be a key of param_dict
      inp.name = k;
      // input tag's value should be a value associated with the key that we are passing in inp.name
      inp.value = valArr[i];
      // append those all input tags in the form tag
      frm.appendChild(inp);
    });

    // append all the above tags into the body tag
    document.body.appendChild(heading1);
    document.body.appendChild(heading2);
    document.body.appendChild(frm);
    // finally submit that form
    frm.submit();

    // if you remember, the param_dict also has "'CALLBACK_URL': 'http://127.0.0.1:8000/api/handlepayment/'"
    // so as soon as Paytm gets the payment it will hit that callback URL with some response and
    // on the basis of that response we are displaying the "payment successful" or "failed" message
  };

  useEffect(()=>{ 
      const formData = new FormData();
    formData.append('from',props.location.state.booking.fromDate);
    formData.append('to',props.location.state.booking.toDate);
    formData.append('price',moment(props.location.state.booking.toDate).diff(moment(props.location.state.booking.fromDate),'days')*props.location.state.car.details__price_by_model)
     BookCar(props.location.state.car.id,formData).then(res=>handleSuccess(res.param_dict));
  },[])

//   const startPayment = async () => {
//     let bodyData = new FormData();

//     // send data to the backend
//     bodyData.append("amount", amount);
//     bodyData.append("name", name);
//     bodyData.append("email", email);

//     await Axios({
//       url: `${server}/api/pay/`,
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       data: bodyData,
//     }).then((res) => {
//       // we will retrieve the param_dict that we are sending from the backend with
//       // all the necessary credentials, and we will pass it to the handleSuccess() func 
//      //  for the further process
//       if (res) {
//         handleSuccess(res.data.param_dict);
//       }
//     });
//   };

//   return (
//     <div id="paymentFrm" className="container" style={{ marginTop: "20vh" }}>
//       <form>
//         <h1>Payment page</h1>

//         <div className="form-group">
//           <label htmlFor="name">Product name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="exampleInputPassword1">Amount</label>
//           <input
//             type="text"
//             className="form-control"
//             id="amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="exampleInputPassword1">Email</label>
//           <input
//             type="text"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//       </form>
//       <button onClick={startPayment} className="btn btn-primary btn-block">
//         Pay with PayTm
//       </button>
//     </div>
//   );
return<></>
};

export default App;
