import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from './list';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2, 0, 0),
    },
}));

export default function Home() {
    const [values, setEdit] = useState({ email: '', password: '' });
    const classes = useStyles();

    function handleChange(value) {
        setEdit(value);
    }

    return (
        <Container component="main">
            <CssBaseline />
            <h1>teste</h1>
            <ReactQuill value={values}
                onChange={handleChange} />
            <Button className={classes.button} variant="contained" color="primary">
                Send
            </Button>
            <List />
        </Container>
    )
}
