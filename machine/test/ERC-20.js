const { expect } = require("chai");
const { ethers } = require("hardhat");
const { bigint } = require("hardhat/internal/core/params/argumentTypes");

describe("ERC-20 Small Project", () => {
  let contract;
  let owner,addr1,addr2;
  beforeEach(async () => {
    {
      [owner,addr1,addr2]=await ethers.getSigners();
      const provider = await ethers.getContractFactory("ERC");
      const run = await provider.deploy();
      await run.waitForDeployment();
      contract = run;
    }
});
  it("Check the transfer function",async function () {
      const TokenName=await contract.tokenName();
      console.log("Token Name :",TokenName);

      const sym=await contract.symbol();
      console.log("Symbol :",sym);

      const supply=await contract.totalsupply();
      console.log("Total Supply :",Number(supply));

      const token=await contract.transfer(addr1.address,100);
      await token.wait();

      const bal=await contract.balance(addr1.address)

      console.log("This is Token :",Number(bal));
      expect(bal).to.equal(100);
  })
  it("Check the approve function",async function () {
    const approvel=await contract.approve(addr1.address,100);
    await approvel.wait();
  })
  it("Check the transferFrom + allowance",async function () {
      await contract.approve(addr1.address,100);
      
      const from=await contract.connect(addr1).transferFrom(owner.address,addr2.address,70);
      await from.wait();

      const ap=await contract.allownaceof(owner.address,addr1.address);
      console.log("This is allowanceof :",Number(ap));

      const check=await contract.allownace(owner.address,addr1.address);
      console.log("This allowence address",Number(check));
      expect(check).to.equal(30);
  })
});
