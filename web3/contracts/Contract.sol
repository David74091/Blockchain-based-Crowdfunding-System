// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner; // 提案人地址
        string title; // 提案標題
        string description; // 提案描述
        uint256 target; // 目標金額
        uint256 deadline; // 募資截止時間
        uint256 amountCollected; // 已募集金額
        string image; // 提案圖片
        bool withdrawn; // 提案是否已提款
    }

    mapping(uint256 => Campaign) public campaigns; // 使用mapping儲存提案

    uint256 public numberOfCampaigns = 0; // 提案數量
    address public admin; // 管理員地址

    // 限制只有管理員可以調用的函數
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function.");
        _;
    }

    // 構造函數設置管理員地址
    constructor() {
        admin = msg.sender;
    }

    // 創建新的提案
    function createCampaign(string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        // 將提案存入mapping中
        Campaign storage campaign = campaigns[numberOfCampaigns];

        // 檢查提案截止日期是否合法
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = msg.sender; // 設置提案人地址
        campaign.title = _title; // 設置提案標題
        campaign.description = _description; // 設置提案描述
        campaign.target = _target; // 設置目標金額
        campaign.deadline = _deadline; // 設置募資截止日期
        campaign.amountCollected = 0; // 初始化已募集金額
        campaign.image = _image; // 設置提案圖片
        campaign.withdrawn = false; // 初始化提款標記

        numberOfCampaigns++; // 增加提案數量
        return numberOfCampaigns - 1;
    }

    // 管理員向提案捐款
    function donateToCampaign(uint256 _id) public payable onlyAdmin {
        uint256 amount = msg.value; // 獲取捐款金額
        Campaign storage campaign = campaigns[_id]; // 獲取提案

        // 檢查提案是否已經過期、達到目標或已經提款
        require(campaign.deadline >= block.timestamp, "The campaign has already ended.");
        require(campaign.amountCollected <campaign.target, "The campaign has already reached its target.");
require(!campaign.withdrawn, "The campaign has already been withdrawn.");
    campaign.amountCollected += amount; // 更新已募集金額
}

// 管理員提款
function withdraw(uint256 _id) public onlyAdmin {
    Campaign storage campaign = campaigns[_id]; // 獲取提案

    // 檢查提案是否已達到目標並在截止日期之後
    require(campaign.amountCollected >= campaign.target, "The campaign has not reached its target.");
    require(block.timestamp > campaign.deadline, "The campaign has not yet ended.");

    uint256 amount = campaign.amountCollected; // 獲取已募集金額
    campaign.amountCollected = 0; // 重置已募集金額
    campaign.withdrawn = true; // 標記提案已提款

    payable(admin).transfer(amount); // 將資金轉移到管理員地址
}

// 獲取所有提案
function getCampaigns() public view returns (Campaign[] memory) {
    Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

    for (uint i = 0; i < numberOfCampaigns; i++) {
        Campaign storage item = campaigns[i];
        allCampaigns[i] = item;
    }

    return allCampaigns;
}

function searchCampaigns(string memory _searchTerm) public view returns (Campaign[] memory) {
    Campaign[] memory matchingCampaigns = new Campaign[](numberOfCampaigns);
    uint256 matchingCampaignsCount = 0;

    for (uint256 i = 0; i < numberOfCampaigns; i++) {
        Campaign storage campaign = campaigns[i];

        // check if title contains search term
        if (bytes(campaign.title).length > 0 && bytes(_searchTerm).length > 0 && 
            containsIgnoreCase(campaign.title, _searchTerm)) {
            matchingCampaigns[matchingCampaignsCount] = campaign;
            matchingCampaignsCount++;
        }
    }

    // create a new array with only the matching campaigns
    Campaign[] memory result = new Campaign[](matchingCampaignsCount);
    for (uint256 i = 0; i < matchingCampaignsCount; i++) {
        result[i] = matchingCampaigns[i];
    }

    return result;
}

function containsIgnoreCase(string memory _str, string memory _substr) internal pure returns (bool) {
    bytes memory strBytes = bytes(_str);
    bytes memory substrBytes = bytes(_substr);
    uint256 strLen = strBytes.length;
    uint256 substrLen = substrBytes.length;

    for (uint256 i = 0; i <= strLen - substrLen; i++) {
        bool ismatch = true;
        for (uint256 j = 0; j < substrLen; j++) {
            if (lowercase(strBytes[i + j]) != lowercase(substrBytes[j])) {
                ismatch = false;
                break;
            }
        }
        if (ismatch) {
            return true;
        }
    }

    return false;
}

// helper function to convert a byte to lowercase
function lowercase(bytes1 _b) internal pure returns (bytes1) {
    if (_b >= 0x41 && _b <= 0x5a) {
        return bytes1(uint8(_b) + 32);
    }
    return _b;
}
}