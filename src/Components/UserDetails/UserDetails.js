import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import firebase from '../../firebase';

const mapStateToProps = state => { 
  return { mystate: state };
};

const useStyles = makeStyles({
    card: {
      minWidth: 500,
      height:300,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
  export  function UserDetails({mystate}) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
  
    return (
      <Card className={classes.card}>
        <CardContent>
         
          <Typography variant="h5" component="h2">
          Name:-  {mystate.firstname}
  
           
           
          </Typography>
           <Typography variant="h5" component="h2">
          Email:- {mystate.email}
  
           
           
          </Typography>
           <Typography variant="h5" component="h2">
          Gender:-    {mystate.gender}
  
           
           
          </Typography>
           <Typography variant="h5" component="h2">
          Address:- {mystate.address}

  
           
           
          </Typography>
           <Typography variant="h5" component="h2">
          Mobile No:-   {mystate.mobile}
         
  
           
           
          </Typography>
           
          
        <Button
            type="submit"
            
            variant="contained"
            color="primary"
           onClick={logOutUser} 
          >
            Logout 
          </Button>

           
        </CardContent>


      
      </Card>
    );
  }

  const logOutUser = (props) => {
         firebase.auth().signOut();
         window.location.href="/";
  };
  
  const List = connect(mapStateToProps)(UserDetails);
export default List;