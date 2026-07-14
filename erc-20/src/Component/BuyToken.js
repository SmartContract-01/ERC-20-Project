import "./BuyToken.css";
import { useState } from "react";
const { ethers } = require("ethers");
function Buy({ Contract, account ,set,setRate}) {
  const [ethAmount, setAmount] = useState("");
  const BuyTokens_Process = async (e) => {
    console.log("Contract State:", Contract);
    if (!Contract) {
      console.log("contract not ready");
      return;
    } else {
      console.log("contract ready");
    }
    try {
      const Eth_Rate = await Contract.rate();
      const Rate_Store = await Number(Eth_Rate);
      const Multiply = (await Rate_Store) * ethAmount;
      console.log("Rate :", Multiply);
      const Buy_Tokens = await Contract.buyTokens({
        value: ethers.parseUnits(ethAmount, 18),
      });
      await Buy_Tokens.wait();
      console.log("Buy Token :", Buy_Tokens);
      setRate(Buy_Tokens);
      setAmount("");
    } catch (err) {
      window.alert("transaction failed");
      console.error(err);
    }
  };
  return (
    <div className="Buy">
      <button className="button_class" onClick={BuyTokens_Process}>BuyToken</button>
      <input
        className="input_class"
        text="text"
        placeholder="0"
        value={ethAmount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  );
}

export default Buy;
