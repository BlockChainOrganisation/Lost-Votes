import React, { Component } from "react";
import ElectionContract from './contracts/Election.json';
import getWeb3 from "./getWeb3";
import {
  Route,
  NavLink,
  Switch
} from "react-router-dom";

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import Home from './Home';
import About from './About';

import "./App.css";

class App extends Component {

 

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log("getId " + networkId);
      const deployedNetwork = ElectionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log("instance " + instance)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.x`
      this.setState({ web3 : web3 , accounts : accounts, contract : instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleVoterAddress = (event) =>{
    this.setState({VoterAddress : event.target.value})
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const address = this.state.VoterAddress;
    const contract = this.state.contract;
    // const response =  await contract.methods.Voters(address).call();
 
    // console.log("response is " +response);


  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.Candidates(1).call();
    
    //  await contract.methods.addVoter(accounts[0]).send({ from: accounts[0] });


    // Get the value from the contract to prove it worked.
    const party1 = await contract.methods.Candidates(1).call();
    const party2 = await contract.methods.Candidates(2).call();
    const party3 = await contract.methods.Candidates(3).call();

  

// 0: "1"
// 1: "Narendra Modi"
// 2: "BJP"
// 3: "0"
    
   // Update state with the result.
    this.setState({ totalVoters: 1 , isLoaded:true , party1 : [party1[0] , party1[1] , party1[2]] , 
      party2 : [party2[0] , party2[1] , party2[2]] ,
      party3 : [party3[0] , party3[1] , party3[2]] });
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoaded : false , web3 : null, accounts : null , contract : null , VoterAddress : ''
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

        <div className="nav">
          <NavLink exact to="/" activeClassName="active">Homepage</NavLink>
          <NavLink to="/validateVoter" activeClassName="active">Validate Voter</NavLink>
        </div>


        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={450}
              classNames="fade"
            >
              <Switch location={location}>
                <Route exact path="/">
                <Home 
                  party1={this.state.party1}
                  party2={this.state.party2}
                  party3={this.state.party3}
                />
                </Route>
                <Route path="/validateVoter" >
                  <About Value={this.state.VoterAddress}
                   changeAddress={this.handleVoterAddress} 
                   handleSubmit = {this.handleSubmit}
                   />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
    
    {/*
     1. Create an element where all the pary meber will be located along with the button to vote
    2. Create a page for Voting and one for checking, where people will just add their address and check if they are eligible to vote
    3. They should select their Constituency and then check their vote.
    make farzi page for selecting Constituency
    This page should have a feature where people can see if the person has voted or not.
    Show judges that after voting , they website shows you have already voted
     */}
   
    
      {/* <p> total number of voters are {this.state.Candidate}</p>
      <p> number :{this.state.party1[0]}</p>
      <p> name :{this.state.party1[1]}</p>
      <p> Party name :{this.state.party1[2]}</p>

      <p> number :{this.state.party2[0]}</p>
      <p> name :{this.state.party2[1]}</p>
      <p> Party name :{this.state.party2[2]}</p>
      */}
      </div>
    );
  }
}

export default App;
