import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../Contract_Address.js";
import { useEffect } from "react";
import { useState } from "react";
import "./Wallet_info.css";
const { ethers } = require("ethers");

function Wallet({ sendContract }) {
//   const [Contract, setContract] = useState(null);
  const [Contract_Token, SetToken] = useState("");
  const [Token_Symbol, SetSymbol] = useState("");
  useEffect(() => {
    const Token = async () => {
      const jsnoRpc = new ethers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/6b02f694eadd41f283326ca4912ccce9",
      );
      const c1 = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, jsnoRpc);
      const Token_Name = await c1.tokenName();
      SetToken(Token_Name);

      const Symbol = await c1.symbol();
      SetSymbol(Symbol);
    };
    Token();
  }, []);
  const connect2 = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer,
      );
    //   setContract(contract);
      sendContract(contract);
    } catch (err) {
      console.error(err);
    }
  };
  connect2();
  const connect = async () => {
    if (!window.ethereum) {
      window.alert("Please install Meta Mask");
      return;
    }
    connect2();
  };
  return (
    <div className="Wallet_css">
      <h1>{Contract_Token}</h1>
      <h2>{Token_Symbol}</h2>
      <button onClick={connect}>Connect</button>
    </div>
  );
}
export default Wallet;
