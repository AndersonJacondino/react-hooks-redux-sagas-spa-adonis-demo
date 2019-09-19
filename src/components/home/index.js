import React, { useEffect, useState } from 'react';
import { loadlist, setloadlist } from '../../redux/core/actions/listActions';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Nav from '../nav';
import List from './list';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2, 0, 0),
    },
    load: {
        margin: theme.spacing(2, 0),
        textAlign: 'center',
    },
    fab: {
        margin: theme.spacing(1),
        position: 'fixed',
        bottom: 20,
        right: 20
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));
const Home = () => {
    const [values, setEdit] = useState({});
    const classes = useStyles();
    const dispatch = useDispatch();
    const tweets = useSelector(state => state.home);

    useEffect(() => {
        dispatch(loadlist(1));
    }, [dispatch]);

    function handleChange(value) {
        setEdit(value);
    }

    function publicar() {
        const data = { content: values };
        dispatch(setloadlist(data));
    }

    return (
        <div>
            <Nav />
            <Container component="main">
                <CssBaseline /><br></br>
                <ReactQuill value={values}
                    onChange={handleChange} />
                <Button className={classes.button} onClick={() => { publicar() }} variant="contained" color="primary">
                    Send
                </Button>
                <div className={classes.load}>
                    {tweets.list.length !== 0 ?
                        <List list={tweets.list.flat()}
                            lastPage={tweets.lastPage}
                            page={tweets.page}
                            perPage={tweets.perPage}
                            total={tweets.total} /> : <CircularProgress />}
                </div>
                <div className="chat">
                    <div className="header-msg">
                        <AccountCircleIcon color="primary" style={{ fontSize: 40 }}/>
                        <h4>Teste de WebSocket</h4> 
                    </div>
                    <div className="body-msg">
                        <div className="mine messages">
                            <div className="message last">
                                Dude
                        </div>
                        </div>
                        <div className="yours messages">
                            <div className="message">
                                Hey!
                         </div>
                            <div className="message">
                                You there?
                        </div>
                            <div className="message last">
                                Hello, how's it going?
                    </div>
                        </div>
                        <div className="mine messages">
                            <div className="message">
                                Great thanks!
                        </div>
                            <div className="message last">
                                How about you?
                        </div>
                        </div>
                    </div>
                    <div className="footer-msg">
                        <Paper className={classes.root}>
                            <InputBase
                                className={classes.input}
                                placeholder="Send Message"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                                <SendIcon />
                            </IconButton>
                        </Paper>
                    </div>
                </div>
                <Fab color="primary" aria-label="add" className={classes.fab + ' pulse'}>
                    <ChatIcon />
                </Fab>
            </Container>
        </div>
    )
}

export default Home;
