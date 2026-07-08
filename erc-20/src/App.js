import "./App.css";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./Contract_Address.js";
import BuyTokens from "./Component/BuyToken";
import SellToken from "./Component/SellToken.js";
import Transfer from "./Component/Transfer.js";
import image from "./images.jpg";
import { useState, useEffect } from "react";
const { ethers } = require("ethers");

function App() {
  const [Contract, setContract] = useState(null);
  const [Contract_Token, SetToken] = useState("");
  const [Token_Symbol, SetSymbol] = useState("");
  const [Json, SetJson] = useState("");
  const [account, setAccount] = useState("");

  // ✅ 1. Read-only contract (JsonRpc)
  useEffect(() => {
    const Token = async () => {
      const jsnoRpc = new ethers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/6b02f694eadd41f283326ca4912ccce9",
      );

      const c1 = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, jsnoRpc);

      SetJson(c1);

      const Token_Name = await c1.tokenName();
      SetToken(Token_Name);

      const Symbol = await c1.symbol();
      SetSymbol(Symbol);
    };

    Token();
  }, []);

  // ✅ 2. AUTO CONNECT (page load par check karega)
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();

        if (accounts.length > 0) {
          const signer = await provider.getSigner();

          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer,
          );

          setContract(contract);
          setAccount(accounts[0].address);

          console.log("Auto Connected:", accounts[0].address);
        }
      }
    };

    checkConnection();
  }, []);

  // ✅ 3. ACCOUNT SWITCH HANDLER (no reload)
  useEffect(() => {
    if (window.ethereum) {
      const handler = async (accounts) => {
        if (accounts.length === 0) {
          setContract(null);
          setAccount("");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer,
        );

        setContract(contract);
        setAccount(accounts[0]);

        console.log("Switched Account:", accounts[0]);
      };

      window.ethereum.on("accountsChanged", handler);

      // cleanup
      return () => {
        window.ethereum.removeListener("accountsChanged", handler);
      };
    }
  }, []);

  // ✅ 4. CONNECT BUTTON
  const connect2 = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer,
      );

      setContract(contract);
      setAccount(address);

      console.log("Manually Connected:", address);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
        <img src={image}/>
        <h5 className="Token">Token Name : {Contract_Token}</h5>
        <h5 className="Symbol">Token Symbol : {Token_Symbol}</h5>
    
      <button onClick={connect2}>Connect</button>

      {/* 🔥 current account show */}
      <h3>Connected: {account}</h3>

      <BuyTokens Contract={Contract} />
      <SellToken Contract={Contract} />
      <Transfer Contract={Contract} Json={Json} />
    </div>
  );
}

export default App;
