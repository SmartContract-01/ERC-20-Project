import "./SellToken.css";
import { useState } from "react";
const { ethers } = require("ethers");
function Sell({ Contract }) {
  const [Sell_Token, setSell_Token] = useState("");
  const SellTokens_Process = async () => {
      if(!Contract){
          console.log("Contract is not ready");
          return;
      }
    try {
        const s1=await Contract.rate();
        const s2=Number(s1);
        const s3=await Sell_Token / s2;
        console.log("S2 Token :",s3);
        
        const sell = await Contract.sellToken(ethers.parseEther(Sell_Token));
        await sell.wait();
        console.log("Sell Token :", sell);
        
      setSell_Token("");
    } catch (err) {
      console.error(err);
    }
  };
 
  return (
    <div className="Sell">
      <input
        className="input_class2"
        text="text"
        placeholder="0"
        value={Sell_Token}
        onChange={(e) => setSell_Token(e.target.value)}
      />
      <button className="sell_class" onClick={SellTokens_Process}>SellTokens</button>
    </div>
  );
}
export default Sell;
