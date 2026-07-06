import { useState } from "react";
const { ethers } = require("ethers");
function Sell({ Contract }) {
  const [Sell_Token, setSell_Token] = useState("");
  const [Rating,setRating] = useState("");
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
        setRating(s3);

      const sell = await Contract.sellToken(ethers.parseEther(Sell_Token));
      await sell.wait();
      
      console.log("Sell Token :", sell);
      setSell_Token("");
      setRating("");
    } catch (err) {
      console.error(err);
    }
  };
 
  return (
    <div>
      <h1>{Rating}</h1>
      <button onClick={SellTokens_Process}>SellTokens</button>
      <input
        text="text"
        placeholder="Enter Token"
        value={Sell_Token}
        onChange={(e) => setSell_Token(e.target.value)}
      />
    </div>
  );
}
export default Sell;
