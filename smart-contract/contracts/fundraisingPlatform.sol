// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22;

contract fundraisingPlatform {
    uint aggregateWallet; //捐款匯總錢包
    uint remittanceWallet; //撥款錢包
    uint beneficiaryWallet; //受益人錢包
    uint limitOfAgg; //捐款錢包達標金額;
    bool reached; //捐款金額是否達標
    address manager; //管理者地址
    address beneficiary; //受益人地址
    string proposalData; //提案內容
    uint proposalAmount; //提案金額
    bool isAgree; //提案是否通過

    //捐贈者
    struct Donor{
        uint weight; //權重
        bool voted; //是否投過票
        uint8 voteTo; //投給什麼選項
    }

    //受益人
    struct Beneficiary{
        uint proved; //是否投票通過
    }

    //提案
     struct Proposal{
        uint voteCount; 
    }
    Proposal[] proposals;
    mapping(address => Donor) donors; //地址映射捐款者


    constructor(uint _limitOfAgg, address _beneficiary){
        // aggregateWallet = initAggregateWallet;
        // remittanceWallet = initRemittanceWallet;
        limitOfAgg = _limitOfAgg;
        _beneficiary = beneficiary;
        manager = msg.sender;
        reached = false;
        donors[manager].weight = 1;
    }

    //管理者給予捐款資格
    function givePm(address donor) public {
        require(msg.sender == manager);
        require(donors[donor].voted == false);
        require(donors[donor].weight == 0);
        donors[donor].weight = 1;
    } 

    //捐款人捐款
    function donate(uint amount) public{
        require(aggregateWallet < limitOfAgg);
        aggregateWallet += amount;
        if (aggregateWallet >= limitOfAgg){
            reached = true;
        }
    }
    
    //檢查金額是否達標
    function checkRc() public returns(bool) {
       require(msg.sender == manager);
       if (aggregateWallet >= limitOfAgg){
           reached = true;
           return reached;
       }else{
           return false;
       }
    }

    //捐款匯總錢包轉移至撥款錢包
    function firstTransfer() public returns(string memory){
        require(reached == true);
        uint total = aggregateWallet;
        aggregateWallet -= total;
        remittanceWallet += total;
        return("transfer success");
    }

    //受益人提交使用提案、欲使用金額
    function makeProposal(string memory proposal, uint amount) public{
        // require(msg.sender == beneficiary);
        proposalData = proposal;
        proposalAmount = amount;
    }

    //查看提案內容
    function checkProposal() public view returns (string memory, uint){
        return (proposalData, proposalAmount);
    }

    //進行投票
    //同意票
     function agree() public {        
        Donor storage sender = donors[msg.sender];
        require(!sender.voted);
        sender.voted = true;
        sender.voteTo = 0;
        proposals[0].voteCount += sender.weight;
    }
    //不同意票
    function reject() public {        
        Donor storage sender = donors[msg.sender];
        require(!sender.voted);
        sender.voted = true;
        sender.voteTo = 1;
        proposals[1].voteCount += sender.weight;
    }

    //結算投票
     function checkWin() public returns (string memory _winningProposal){
        require(msg.sender == manager);
        if (proposals[0].voteCount >= proposals[1].voteCount){
            isAgree = true;
            return "pass";
        }else{
            return "not pass";
        }
    }

    //匯款錢包撥款
    function secondTransfer() public {
        uint total = proposalAmount;
        require(isAgree == true);
        remittanceWallet -= total;
        beneficiaryWallet += total;
    }

    //查看各個錢包餘額
    //匯總錢包
    
    function checkAggregateWallet() public view returns(uint){
        return aggregateWallet;
    }
    //撥款錢包
    function checkRemittanceWallet() public view returns(uint){
        return remittanceWallet;
    }
    //受益者錢包
    function checkBeneficiaryWallet() public view returns(uint){
        return beneficiaryWallet;
    }
}