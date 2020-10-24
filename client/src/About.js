import React from 'react';
// import logo from './assets/download.jpg';

const About = (props) => {
    return(
        <div className="page">
            <section>
                <h1>Voters' Validation</h1>
                <form onSubmit ={props.handleSubmit}>
                    <label>Address:</label> <br />
                    <input type ='text' value={props.Value} 
                        onChange={props.changeAddress} />
                        <br />

                    <input type="submit" value="Check" />
                </form>
                
            </section>
        </div>
    )
}

export default About;