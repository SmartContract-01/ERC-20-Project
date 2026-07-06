import { useState } from "react";
const { ethers } = require("ethers");
function Buy({ Contract }) {
  const [ethAmount,setAmount] = useState("");
  const [Rate,setRate]=useState("");
  const BuyTokens_Process = async (e) => {
    console.log("Contract State:", Contract);
    if (!Contract) {
      console.log("contract not ready");
      return;
    } else {
      console.log("contract ready");
    }       
    try {
      const Eth_Rate=await Contract.rate();
      const Rate_Store=await Number(Eth_Rate);
      const Multiply=await Rate_Store*ethAmount;
      console.log("Rate :",Multiply);
      setRate(Multiply);
      const Buy_Tokens = await Contract.buyTokens({value : ethers.parseUnits(ethAmount,18)});
      await Buy_Tokens.wait();
      console.log("Buy Token :", Buy_Tokens);
      setAmount("");
      setRate("");
    } catch (err) {
      window.alert("transaction failed");
      console.error(err);
    }
  };
  return (
    <div>
      <h1>{Rate}</h1>
      <button onClick={BuyTokens_Process}>BuyTokens</button>
      <input
      text="text"
      placeholder="Enter Eth"
      value={ethAmount}
      onChange={(e)=>setAmount(e.target.value)}/>
    </div>
  );
}

export default Buy;
