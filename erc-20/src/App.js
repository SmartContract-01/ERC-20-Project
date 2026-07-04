import "./App.css";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./Contract_Address.js";
import BuyTokens from "./Component/BuyToken";
import SellToken from "./Component/SellToken.js";
import { useEffect } from "react";
import { useState } from "react";
const { ethers } = require("ethers");
function App() {
  const [Contract, setContract] = useState(null);
  const [Input, setInput] = useState("");
  useEffect(() => {
    async function Fetch() {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer,
      );
      setContract(contract);
    }
    Fetch();
  }, []);
  const Call_Transfer = async () => {
    try {
      const Send = await Contract.transfer(Input, 1000);
      console.log("Token Name :", Send);

      Contract.on("Transfer", (sender, reciver, amount) => {
        console.log("Sender :", sender);
        console.log("Reciver :", reciver);
        console.log("Amount :", Number(amount));
      });
      await Send.wait();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="App">
      <button onClick={Call_Transfer}>Transfer</button>
      <input
        text="text"
        placeholder="Enter Address"
        value={Input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <BuyTokens Contract={Contract} />
      <SellToken Contract={Contract} />
    </div>
  );
}

export default App;
