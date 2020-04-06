import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { addArticle } from "../../Actions/index";
import { Redirect } from 'react-router';
import firebase from '../../firebase';



export  class Login extends Component {
  state = {
    email: '',
    password: '',
    error: null,
    title:'',
    redirect:false,
  };
 handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
  
       const email=this.state.email;
       const password=this.state.password;

       let self = this;
 
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
      
             

        firebase.database().ref('users/' + user.user.uid).once('value')
        .then(function(snapshot){

         
               console.log(snapshot.val());

             
              var firstname=snapshot.val().firstname
                var mobile=  snapshot.val().mobile
                var zip=  snapshot.val().zip
               var gender= snapshot.val().gender
                var address=snapshot.val().address
               self.sendData( email,firstname,mobile,zip,gender,address );

        })
        .catch((error)=>{

            console.log(error)
        });

        
              
      


      })
      .catch((error) => {
            console.log(error);
            this.setState({ error: error });
      });
  };

  sendData = ( email,firstname,mobile,zip,gender,address ) =>{


         this.props.addArticle({  email,firstname,mobile,zip,gender,address });
       
            this.setState({redirect: true});


  }


  render() {

    if (this.state.redirect) {
      return <Redirect push to="/userdetails" />;
    }
    
    return (
      <div>
         <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
     
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
         {this.state.error?<h4 style={{'color':'red'}}>UserName or password is invalid</h4>:''} 

        <form onSubmit={this.handleSubmit}  noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.handleInputChange} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </Grid>
           
          </Grid>
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
           
          >
            Login 
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                Create new account
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        
      </Box>
    </Container>
        
        
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
}

const Form = connect(null, mapDispatchToProps)(Login);

export default Form;
