import { useState } from "react";
const { ethers } = require("ethers");
function Transfer({ Contract }) {
  const [Input, setInput] = useState("");
  const [Check, setBalance] = useState("");
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
  const BalanceOf = async () => {
    const Token = await Contract.balanceof(Check);

    console.log("Balance of Buyer :", ethers.formatEther(Token));
    setBalance("");
  };
  return (
    <div className="transfer_css">
      <button onClick={Call_Transfer}>Transfer</button>
      <input
        text="text"
        placeholder="Enter Address"
        value={Input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <br/>
      <br/>
      <button onClick={BalanceOf}>CheckBalance</button>
      <input
        text="text"
        placeholder="Enter Address"
        value={Check}
        onChange={(e) => setBalance(e.target.value)}
      />
    </div>
  );
}
export default Transfer;
