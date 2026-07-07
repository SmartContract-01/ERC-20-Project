import { useState } from "react";
const { ethers } = require("ethers");
function Transfer({ Contract, Json }) {
  const [Input, setInput] = useState("");
  const [Check, setBalance] = useState("");
  const [Input_Token, SetToken] = useState("");
  const Call_Transfer = async () => {
    try {
      console.log("TransferContract :", Contract);
      const deci = await Json.decimal();
      const c2 = await ethers.parseUnits(Input_Token, deci);
      const Send = await Contract.transfer(Input, c2);
      await Send.wait();
      console.log("Token Name :", Send);
    } catch (err) {
      console.error(err);
    }
  };
  const BalanceOf = async () => {
    console.log("Contract :", Json);
    const Token = await Json.balanceof(Check);

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
      <input
        text="text"
        placeholder="Enter Token"
        value={Input_Token}
        onChange={(e) => {
          SetToken(e.target.value);
        }}
      />
      <br />
      <br />
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
