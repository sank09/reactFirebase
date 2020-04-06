import { createStore } from "redux";
import rootReducer from  "../src/Reducers/index";

const store = createStore(rootReducer);

export default store;