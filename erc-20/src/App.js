import "./App.css";
import BuyTokens from "./Component/BuyToken";
import SellToken from "./Component/SellToken.js";
import Wallet from "./Component/Wallet_info.js";
import Transfer from "./Component/Transfer.js";
import { useState } from "react";
function App() {
    const [Contract,SetContract] = useState("");
  const get=async (contract) => {
      // console.log("Address : ",contract);
      SetContract(contract)
  }
  return (
    <div className="App">
      <Wallet sendContract={get}/>
      <BuyTokens Contract={Contract}/>
      <SellToken Contract={Contract}/>
      <Transfer Contract={Contract}/>
    </div>
  );
}

export default App;
