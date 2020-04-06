const USER_DETAILS = "USER_DETAILS";
const initialState = {
  email:'',
  password:'',
   firstname:'',
    mobile:'',
    zip:'',
    gender:'',
    address:'',
};

function rootReducer(state = initialState, action) {
  if (action.type === USER_DETAILS) {
    return Object.assign({}, state, {
      email: action.payload.email,
       firstname:action.payload.firstname,
	    mobile:action.payload.mobile,
	    zip:action.payload.zip,
	    gender:action.payload.gender,
	    address:action.payload.address,
    });
  }
  return state;
}

export default rootReducer;