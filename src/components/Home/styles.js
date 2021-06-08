import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '16px',
  },
  weather: {
marginBottom: '1rem',
display: 'flex',
flexDirection: 'column',
justifyContent: 'space-between',
padding: '1.5rem 1.5rem',
position: 'flex',

textAlign: 'center'
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));