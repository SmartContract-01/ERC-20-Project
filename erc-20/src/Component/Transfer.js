import "./Transfer.css";
import { useState } from "react";
const { ethers } = require("ethers");
function Transfer({ Contract, Json }) {
  const [Input, setInput] = useState("");
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
  return (
    <div className="transfer_css">
      <input
        className="input_class3"
        text="text"
        placeholder="Enter Address"
        value={Input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <input
        className="input_class4"
        text="text"
        placeholder="Enter Token"
        value={Input_Token}
        onChange={(e) => {
          SetToken(e.target.value);
        }}
      />
      <button className="button_class2" onClick={Call_Transfer}>
        Transfer
      </button>
    </div>
  );
}
export default Transfer;
