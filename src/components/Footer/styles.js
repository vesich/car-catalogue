
import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    appBar: {
        borderRadius: '15px',
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'black',
        padding: '10px 30px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    }
}));