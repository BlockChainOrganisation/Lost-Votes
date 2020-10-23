pragma solidity ^0.6.1;

contract Election{
    /*
    
    possible Improvements
    a. Add the ending time of auction
    b. Make the votes hidden from public otherwise they can see the vote of who voted
    
    */
    
    string public Contituency;                  //name of Contituency
    address public Chairperson;                 //name of Owner Of contract (usually Election Commision)
    uint public totalVotesCasted;
    uint public totalCandidates;
    uint public totalVotersInConstituency;
    
    //modifier
    modifier onlyOwner() {
        require(msg.sender == Chairperson , " You are not the Owner of this Contract");
        _;
    }
    
    modifier numshouldExist (uint num){
        require(num > 0 && num <= totalCandidates, "Candidate Number doesn't exist");
        _;
    }
    
    
    //events
    event Voted(address indexed voter);
    event CandidateAdded(uint candidate_number , string  candidateName , string  candidateParty);
    event VoterAdded(address indexed voter);
    event ElectionEnded(string  electionEnded);
    
    
    //structs
    struct Candidate{
        uint id;
        string name;
        string party_name;
        uint vote_count;
        
    }
    
    struct Voter{
        bool hasVoted;
        bool canVote;
    }
    
    
    //mappings
    mapping (uint => Candidate) public Candidates;
    mapping (address => Voter) public Voters;
    
    
    constructor(string memory _constituencyName ) public{
        Chairperson = msg.sender;
        Contituency = _constituencyName;
        addCandiate("Narendra Modi","BJP");
        addCandiate("Rahul Gandhi","Congress");
        addCandiate("Arvind Kejriwal" , "AAP");
        // addVoter(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2); // should be added manually
        // addVoter(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db); 
    }
    
    
    //functions
    function addCandiate(string memory _name , string memory _party_name ) public onlyOwner {
        totalCandidates++;
        Candidates[totalCandidates] = Candidate(totalCandidates , _name , _party_name,0);
        emit CandidateAdded(totalCandidates , _name , _party_name);
        
    }
    
    function addVoter(address _voter) public onlyOwner {
        
        Voters[_voter] = Voter( false , true);
        totalVotersInConstituency++;
        emit VoterAdded(msg.sender);
    }
    
    function calculateVotes(uint _candidateNumber) public view onlyOwner returns (uint _voteCount)  { 
        _voteCount =  Candidates[_candidateNumber].vote_count;
       
    }
    
    function vote (uint _candidateNumber) public numshouldExist(_candidateNumber) {
        require( Voters[msg.sender].canVote , "You are not allowed to vote in this constituency"); // person should be in voting list
        require( !Voters[msg.sender].hasVoted, " You can only vote once "); //person should not have voted before
        
        Voters[msg.sender].hasVoted = true; // voter can't vote more than one time
        
        Candidates[_candidateNumber].vote_count++;
        totalVotesCasted++;
        emit Voted(msg.sender);
    }
    
}