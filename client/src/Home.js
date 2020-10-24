import React from 'react';
import Party from './PartyEntity'
// import logo from './assets/download (1).jpg';

const Home = (props) => {
    return(
        <div className="page">
            <section>
            {/* // 0: "1"
// 1: "Narendra Modi"
// 2: "BJP"
// 3: "0" */}
            <Party partyNumber = {props.party1[0]}
                    candidateName = {props.party1[1]}
                    partyName = {props.party1[2]}
                    />
                    <br />
            <Party partyNumber = {props.party2[0]}
                    candidateName = {props.party2[1]}
                    partyName = {props.party2[2]}
                    />
                    <br />
            <Party partyNumber = {props.party3[0]}
                    candidateName = {props.party3[1]}
                    partyName = {props.party3[2]}
                    />
             
            </section>
        </div>   
    )
}

export default Home;