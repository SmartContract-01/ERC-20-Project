import { useState } from "react";
const { ethers } = require("ethers");
function Sell({ Contract }) {
  const [Sell_Eth, setSell_Eth] = useState("");
  const [Check, setBalance] = useState("");
  const SellTokens_Process = async () => {
      if(!Contract){
          console.log("Contract is not ready");
          return;
      }
    try {
      const sell = await Contract.sellToken({
        value: ethers.parseEther(Sell_Eth),
      });
      await sell.wait();

      console.log("Sell Token :", sell);
    } catch (err) {
      console.error(err);
    }
    const Token = await Contract.balanceof(Check);
  
    console.log("Balance of Buyer :", Number(Token));
  };
//   const BalanceOf = async () => {
//   };
  return (
    <div>
      <h2>{Sell_Eth}</h2>
      <button onClick={SellTokens_Process}>SellTokens</button>
      <input
        text="text"
        placeholder="Enter Ether"
        value={Sell_Eth}
        onChange={(e) => setSell_Eth(e.target.value)}
      />
      <br />
      <br />
      {/* <button onClick={BalanceOf}>CheckBalance</button> */}
      <input
        text="text"
        placeholder="Enter Address"
        value={Check}
        onChange={(e) => setBalance(e.target.value)}
      />
    </div>
  );
}
export default Sell;
