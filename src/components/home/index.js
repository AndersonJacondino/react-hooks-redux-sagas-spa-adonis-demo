import React, { useEffect, useState } from 'react';
import { loadlist, setloadlist } from '../../redux/core/actions/listActions';
import { useDispatch, useSelector } from 'react-redux';
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

const Home = () => {
    const [values, setEdit] = useState({});
    const classes = useStyles();
    const dispatch = useDispatch();
    const list = useSelector(state => state.home.list);

    useEffect(() => {
        dispatch(loadlist());
    }, []);

    function handleChange(value) {
        setEdit(value);
    }

    function publicar() {
        const data = { content: values };
        dispatch(setloadlist(data));
    }

    return (
        <div>
            <Container component="main">
                <CssBaseline /><br></br>
                <ReactQuill value={values}
                    onChange={handleChange} />
                <Button className={classes.button} onClick={() => { publicar() }} variant="contained" color="primary">
                    Send
                </Button>
                <List list={list} />
            </Container>
        </div>
    )
}

export default Home;
