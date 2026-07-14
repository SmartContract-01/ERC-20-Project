import "./App.css";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./Contract_Address.js";
import BuyTokens from "./Component/BuyToken";
import SellToken from "./Component/SellToken.js";
import Transfer from "./Component/Transfer.js";
import image from "./images.jpg";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
// import WalletConnectProvider from "@walletconnect/web3-provider";
const { ethers } = require("ethers");

function App() {
  const [Contract, setContract] = useState(null);
  const [Contract_Token, SetToken] = useState("");
  const [Token_Symbol, SetSymbol] = useState("");
  const [Json, SetJson] = useState("");
  const [account, setAccount] = useState("");
  const [Address, SetAddress] = useState("");
  const [Wallet, SetWallet] = useState(0);
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

  useEffect(() => {
    // this is not give the live balance we need to refresh and then balance is change
    const WalletBalnce = async () => {
      try {
        if (!Address) {
          console.log("wait ....");
          return;
        }
        const bal = await Contract.balanceof(Address);

        const formate = await ethers.formatEther(bal);
        console.log("Bal :", formate);
        SetWallet(formate);
      } catch (err) {
        console.error(err);
      }
    };
    WalletBalnce();
  }, [Address, Contract]);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();

        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer,
          );

          setContract(contract);
          setAccount(accounts[0].address);
          SetAddress(address);

          console.log("Auto Connected:", accounts[0].address);
        }
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      const handler = async (accounts) => {
        if (accounts.length === 0) {
          setContract(null);
          setAccount("");
          console.log("Account Disconnect ...");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer,
        );

        setContract(contract);
        setAccount(accounts[0]);
        SetAddress(address);

        console.log("Switched Account:", accounts[0]);
      };

      window.ethereum.on("accountsChanged", handler);

      return () => {
        window.ethereum.removeListener("accountsChanged", handler);
      };
    }
  }, []);

  const connect2 = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install meta mask");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      SetAddress(address);
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
      <div className="first_box">
        <FontAwesomeIcon className="font" icon={faEthereum} bounce />
        <h2>LeoX DApp</h2>
        <button onClick={connect2} disabled={account}>
          {account
            ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect"}
        </button>
      </div>
      <div className="second_box">
        <img src={image} />

        <div className="token_info">
          <h5 className="Token">{Contract_Token}</h5>
          <h5 className="Symbol">{Token_Symbol}</h5>
        </div>

        <div className="third_box">
          <p>Wallet Balance</p>
          <div className="t">
            <FontAwesomeIcon className="font_2" icon={faEthereum} />
            <h2>{Wallet}</h2>
          </div>
        </div>
      </div>

      <div className="Structure">
        <div className="BuySell">
          <BuyTokens Contract={Contract} Account={account}/>
          <SellToken Contract={Contract} />
        </div>
        <div className="Transfer">
          <Transfer Contract={Contract} Json={Json} />
        </div>
      </div>
    </div>
  );
}

export default App;
