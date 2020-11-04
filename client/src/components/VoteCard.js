import React from 'react';
import Color from 'color';
// import GoogleFont from 'react-google-font-loader';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { Alert, AlertTitle } from '@material-ui/lab';

const useGridStyles = makeStyles(({ breakpoints }) => ({
    root: {
        [breakpoints.up('md')]: {
            justifyContent: 'center',
        },
    },
}));

const useStyles = makeStyles(() => ({
    actionArea: {
        borderRadius: 16,
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    card: ({ color }) => ({
        minWidth: 256,
        borderRadius: 16,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 ${Color(color)
                .rotate(-12)
                .darken(0.2)
                .fade(0.5)}`,
        },
    }),
    content: ({ color }) => {
        return {
            backgroundColor: color,
            padding: '1rem 1.5rem 1.5rem',
        };
    },
    title: {
        // fontFamily: 'Keania One',
        fontSize: '2rem',
        color: '#fff',
        textTransform: 'uppercase',
    },
    subtitle: {
        // fontFamily: 'Montserrat',
        color: '#fff',
        opacity: 0.87,
        marginTop: '2rem',
        fontWeight: 500,
        fontSize: "1.2rem",
    },
}));

const CustomCard = ({ classes, image, title, subtitle, onClick }) => {
    const mediaStyles = useFourThreeCardMediaStyles();
    return (
        <CardActionArea className={classes.actionArea} onClick={onClick}>
            <Card className={classes.card}>
                <CardMedia classes={mediaStyles} image={image} />
                <CardContent className={classes.content}>
                    <Typography className={classes.title} variant={'h2'}>
                        {title}
                    </Typography>
                    <Typography className={classes.subtitle}>{subtitle}</Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    );
};

export const VoteCard = (props) => {
    const gridStyles = useGridStyles();
    const styles = useStyles({ color: '#203f52' });
    const styles2 = useStyles({ color: '#4d137f' });
    const styles3 = useStyles({ color: '#ff9900' });
    const [open, setOpen] = React.useState(false);
    const [metaCandidate, setMetaCandidate] = React.useState({ "name": "Loda", "number": -1 });
    return (
        <>
            <div className={{
                width: '100%',
                '& > * + *': {
                    marginTop: 2,
                },
            }}>
                {
                    props.alertOpen ? props.voterStatus ? <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                    </Alert> :
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                        </Alert> : <></>
                }
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmation?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-">
                        Are you sure you want to vote for <b>{metaCandidate.name}</b>.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => { setOpen(false); props.handleAgree(metaCandidate.number) }} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid classes={gridStyles} container spacing={4} wrap={'nowrap'} style={{ "marginTop": "10px" }}>
                <Grid item>
                    <CustomCard
                        classes={styles}
                        title={'AAP'}
                        subtitle={'Arvind Kejriwal'}
                        image={
                            'https://static.toiimg.com/thumb/msid-46852473,width-1070,height-580,imgsize-1,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg'
                        }
                        onClick={() => {
                            setMetaCandidate({ "name": "Arvind Kejriwal", "number": 3 })
                            setOpen(true)
                        }}
                    />
                </Grid>
                <Grid item>
                    <CustomCard
                        classes={styles2}
                        title={'Congress'}
                        subtitle={'Rahul Gandhi'}
                        image={
                            'https://d2r2ijn7njrktv.cloudfront.net/IL/uploads/2017/03/congress-logo.jpg'
                        }
                        onClick={() => {
                            setMetaCandidate({ "name": "Rahul Gandhi", "number": 2 })
                            setOpen(true)
                        }}
                    />
                </Grid>
                <Grid item>
                    <CustomCard
                        classes={styles3}
                        title={'BJP'}
                        subtitle={'Narendra Modi'}
                        image={'https://thethinkmedia.com/wp-content/uploads/2018/10/BJP-LOGO.jpg'}
                        onClick={() => {
                            setMetaCandidate({ "name": "Narendra Modi", "number": 1 })
                            setOpen(true)
                        }} />
                </Grid>
            </Grid>
        </>
    );
};
export default VoteCard