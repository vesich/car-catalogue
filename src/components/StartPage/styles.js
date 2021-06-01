import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        borderRadius: '15px',
        position: 'relative',
    },
    heading: {
        padding: '40px 30px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    image: {
        margin: '10px 40px',
        maxWidth: '50%',
        justifyContent: 'center',
        position: 'relative',
        paddingBottom: '30px',
    },
    imageWrapper: {
        display:'flex',
        position: 'relative',
        justifyContent: 'space-around',
        margin: '20px auto',
    },
    container: {
        position: 'relative',
        left: '40px'
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    actionDiv: {
        textAlign: 'center',
    },
}));