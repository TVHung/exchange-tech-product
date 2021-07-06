import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        height: 80,
        backgroundColor: 'coral',
        padding: 0,
        margin: 0,
    },

    gridContainer: {
        margin: 0,
        padding: 0
    },

    logo: {
        float: 'left',
    },

    ul: {
        padding: 0,
        margin: 0,
    },

    li: {
        listStyle: 'none',
        float: 'left',
        margin: 20,
        '&:hover': {
            backgroundColor: 'green'
        },
    },

    linkStyle: {
        textDecoration: 'none',
        color: '#fff',
        fontSize: 25,
    }
}));