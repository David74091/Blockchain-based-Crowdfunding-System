// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign{
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    } 


    mapping(uint256=>Campaign)public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256){

        //將類別array push近來
        Campaign storage campaign = campaigns[numberOfCampaigns];

        // is everything okay?
        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;
        return numberOfCampaigns - 1;

    }

    function donateToCampaign(uint256 _id) public payable {
         uint256 amount = msg.value;
         Campaign storage campaign = campaigns[_id];

         campaign.donators.push(msg.sender);
         campaign.donations.push(amount);

         (bool sent,) = payable(campaign.owner).call{value: amount}("");

         if(sent){
             campaign.amountCollected = campaign.amountCollected + amount;
         }
    }

    function getDonators(uint _id) view public returns (address[] memory, uint256[] memory){
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0 ; i < numberOfCampaigns ; i++){
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