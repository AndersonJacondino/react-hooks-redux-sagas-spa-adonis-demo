import React, { useEffect, useState } from 'react';
import { loadlist } from '../../redux/core/actions/listActions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
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

const Home = (props) => {
    const [values, setEdit] = useState({});
    const classes = useStyles();

    function handleChange(value) {
        setEdit(value);
    }

    function publicar() {
        // const data = { content: values };

        // tweetService.setTweet('/tweets', data)
        //     .then(() => loadContent())
    }

    useEffect(() => {
        props.loadlist();
        console.log(props)
    }, []);

    return (
        <div>
            {console.log(props.list)}
            <Container component="main">
                <CssBaseline />
                <h1>teste</h1>
                <ReactQuill value={values}
                    onChange={handleChange} />
                <Button className={classes.button} onClick={() => { publicar() }} variant="contained" color="primary">
                    Send
            </Button>
                <List list={props.list} />
            </Container>
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return ({
        list: state.home.list,
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loadlist
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);
