// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract ERC{   
    string public tokenName="BitcoinToken";
    string public symbol="BTCT";
    uint public decimal=18;
    uint public rate=1000;
    uint256 immutable public totalsupply;
    mapping (address=>uint) public balanceof;
    mapping (address=>mapping (address=>uint)) public allow;

    event Transfer(address sender,address reciver,uint256 amonut);
    event Approval(address owner,address sender,uint256 amonut);
    constructor(uint _intialsupply){
        totalsupply= _intialsupply*(10**decimal);
        balanceof[address(this)]=totalsupply;
        emit Transfer(address(0), msg.sender, totalsupply);
    }
    function transfer(address to,uint256 amount) public {
        require(balanceof[msg.sender]>=amount,"Insufficient balance for transfer function");

        balanceof[msg.sender]-=amount;
        balanceof[to]+=amount;
        emit Transfer(msg.sender,to,amount);
    }

    function approve(address spender,uint256 amount) public {
        allow[msg.sender][spender]=amount;      

        emit Approval(msg.sender, spender, amount); 
    }
    function allownace(address owner,address spender) public view returns(uint){
        return allow[owner][spender];
    }
     function transferFrom(address from,address to,uint256 amount) public {
        require(balanceof[from]>=amount,"Insufficient balance for transfFrom function ");
        require(allow[from][msg.sender]>=amount,"Not allowed");
        
        balanceof[from]-=amount;
        balanceof[to]+=amount;
        allow[from][msg.sender]-=amount;

        emit Approval(from,to,amount);
    }
    receive() external payable { }
    function buyTokens() public payable{
        uint tokens=msg.value*rate;

        require(balanceof[address(this)]>=tokens,"Insufficient token");

        balanceof[address(this)]-=tokens;
        balanceof[msg.sender]+=tokens;  
    }
    function sellToken(uint tokenAmount) public payable {
        require(balanceof[msg.sender]>=tokenAmount,"Not enough tokens");
        uint tokens=tokenAmount/rate;
        require(address(this).balance>=tokens,"Not enough ether in contract");

        balanceof[msg.sender]-=tokenAmount;
        balanceof[address(this)]+=tokenAmount;
        (bool sell,)=payable(msg.sender).call{value:tokens}("");
        require(sell,"Transfer failed");
    }
}