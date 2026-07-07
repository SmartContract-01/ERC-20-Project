import "./App.css";
import { CONTRACT_ADDRESS,CONTRACT_ABI } from "./Contract_Address.js";
import BuyTokens from "./Component/BuyToken";
import SellToken from "./Component/SellToken.js";
import Transfer from "./Component/Transfer.js";
import { useState } from "react";
import { useEffect } from "react";
const {ethers} = require("ethers");
function App() {
  const [Contract, setContract] = useState(null);
  const [Contract_Token, SetToken] = useState("");
  const [Token_Symbol, SetSymbol] = useState("");
  const [Json,SetJson]=useState("");
  useEffect(() => {
    const Token = async () => {
      const jsnoRpc = new ethers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/6b02f694eadd41f283326ca4912ccce9",
      );
      const c1 = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, jsnoRpc);
      const Token_Name = await c1.tokenName();
      SetJson(c1);
      SetToken(Token_Name);
      const Symbol = await c1.symbol();
      SetSymbol(Symbol);
    };
    Token();
  }, []);
  const connect2 = async () => {
    try {
      if (!window.ethereum) {
        window.alert("Please install Meta Mask");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer,
      );
      setContract(contract);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="App">
      <h1>{Contract_Token}</h1>
      <h2>{Token_Symbol}</h2>
      <button onClick={connect2}>Connect</button>
      <BuyTokens Contract={Contract} />
      <SellToken Contract={Contract} />
      <Transfer Contract={Contract} Json={Json}/>
    </div>
  );
}

export default App;
