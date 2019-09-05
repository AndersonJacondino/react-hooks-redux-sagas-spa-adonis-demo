import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from './list';
import tweetService from '../../service/tweetService';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2, 0, 0),
    },
}));

export default function Home() {
    const [values, setEdit] = useState({});
    const [contents, setContent] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        loadContent()
    }, []);

    function loadContent() {
        tweetService.getTweet('/tweets')
        .then((res) => {
            setContent(res.data)
        })
    }

    function handleChange(value) {
        setEdit(value);
    }

    function publicar() {
        const data = { content: values };

        tweetService.setTweet('/tweets', data)
            .then(() => loadContent())
    }

    return (
        <Container component="main">
            <CssBaseline />
            <h1>teste</h1>
            <ReactQuill value={values}
                onChange={handleChange} />
            <Button className={classes.button} onClick={() => { publicar() }} variant="contained" color="primary">
                Send
            </Button>
            <List list={contents}/>
        </Container>
    )
}
