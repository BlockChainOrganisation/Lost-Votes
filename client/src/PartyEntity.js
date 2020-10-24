import React from 'react'

const PartyEntity = (props) =>{
    return(
        <div className = "candidateBox">
               Party Number: {props.partyNumber}
               Candidate Name : {props.candidateName}
               Party Name: {props.partyName}
        </div>
    )
}
export default PartyEntity;


