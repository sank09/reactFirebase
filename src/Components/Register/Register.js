import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../../firebase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { Redirect } from 'react-router';
import { addArticle } from "../../Actions/index";
import { connect } from "react-redux";

export  class SignUp extends Component {
  
  state = {
    email: '',
    password: '',
    firstname:'',
    mobile:'',
    zip:'',
    gender:'',
    confirm:'',
    address:'',
    error: null,
    isConfirmError:false,
     redirect:false,
  };
 handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
 handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.confirm!=this.state.password){
      this.setState({
        isConfirmError:true,
      })
    }

      const email=this.state.email
      const firstname=this.state.firstname
        const mobile=  this.state.mobile
        const zip=  this.state.zip
       const gender= this.state.gender
        const address=this.state.address


      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {

          firebase.database().ref('users/' + user.user.uid).set({
            firstname: this.state.firstname,
            email: this.state.email,
            address:this.state.address,
            mobile:this.state.mobile,
            zip:this.state.zip,
            gender:this.state.gender,
            confirm:this.state.confirm,
          });

          this.props.addArticle({ email,firstname,mobile,zip,gender,address });


          this.setState({
              email: '',
              password: '',
             firstname:'',
              mobile:'',
              zip:'',
              gender:'',
              address:'',
            });

          this.setState({redirect: true});
   
      
      })
      .catch((error) => {
            console.log(error);
           
      });
  };

  render() {
     if (this.state.redirect) {
      return <Redirect push to="/userdetails" />;
    }

   return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
    
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form  onSubmit={this.handleSubmit} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="firstname"
                label="Name"
                type="text"
                id="firstname"
                autoComplete="current-password"
                value={this.state.firstname}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
            <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={this.state.gender}
          onChange={this.handleInputChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        
        </RadioGroup>
 
            </Grid>
          
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
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
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm"
                label="Confirm Password"
                type="password"
                id="confirm"
                value={this.state.confirm}
                onChange={this.handleInputChange}
              />
            </Grid>
           {this.state.isConfirmError?<h4 style={{'color':'red'}}>Confirm password does not match with above password</h4>:''} 

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="mobile"
                label="Mobile"
                type="text"
                id="mobile"
                value={this.state.mobile}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="zip"
                label="Zip Code"
                type="text"
                id="zip"
                value={this.state.zip}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                type="text"
                id="address"
                value={this.state.address}
                onChange={this.handleInputChange}
              />
            </Grid>
           
          </Grid>
          <br />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        
      </Box>
    </Container>
  )}
}

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
}


const RegisterForm = connect(null, mapDispatchToProps)(SignUp);

export default RegisterForm;