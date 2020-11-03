import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import logo from './assets/download.jpg';

const About = (props) => {
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(false);
    const [value, setValue] = React.useState("");

    const handleClick = () => {
        setStatus(props.handleInput(value))
        setOpen(true)
    }

    return (
        <div className="page">
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmation?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-">
                        {
                            status ? "You Can Vote. Congrats !" : "Sorry, You cannot vote in this election"
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <section>
                <h1>Voters' Validation</h1>
                    <TextField id="outlined-basic" label="Address" variant="outlined" onChange={(e) => setValue(e.target.value)} />
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={handleClick}>
                        Primary
                    </Button>
            </section>
        </div>
    )
}

export default About;