import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  const Buy = async () => {
    const result = await axios.post("http://localhost:3000/creat-order", {
      amount: 5000,
      currency: "INR",
      receipt: "order_receipt_1",
    });
    console.log(result.data.data.id);
    if (result.data.data.status === "created") {
      const options = {
        key_id: "rzp_test_um0VLGCPXk01H3",
        name: "akshay",
        image:
          "https://animenew.com.br/wp-content/uploads/2023/10/Sukuna-e-o-grande-destaque-da-nova-arte-promocional-de-Jujutsu-Kaisen-1-jpg-webp.webp",
        amount: result.data.data.amount,
        currency: result.data.data.currency,
        order_id: result.data.data.id,
        handler: function (response) {
          // give api call here to varify payment
          console.log(response);
          alert(
            "Payment successful! Payment ID: " + response.razorpay_payment_id
          );
        },
        prefill: {
          name: "adi",
          email: "ak@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#990099",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    } else {
      console.log("order not created plz try again");
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={Buy}>Buy</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
