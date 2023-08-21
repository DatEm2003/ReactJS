import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider, connect } from "react-redux";
import store from "./redux/store";
import firebase from './firebase';
import { withRouter } from "react-router";
import { setUser, clearUser } from './redux/users/userActions'
import Spinner from "./components/UI/Spinner";

class Root extends Component {
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.props.history.push('/')
        this.props.setUser(user)
      }else{
        this.props.history.push('/login')
        this.props.clearUser(user)

      }
    })
  }

  render() {
    const { loading } = this.props;

    return (
      
      <Fragment>
       { loading ? <Spinner></Spinner> :
        (<Switch>
          <Route exact path="/" component={App}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
        </Switch>)}
      </Fragment>
    );
  }
}


const mapStateToProps = ({users: {loading}}) => ({
  loading: loading,
})

const mapDispatchToProps = (dispatch)=>({
  setUser: (user)=> dispatch(setUser(user)),
  clearUser: ()=>dispatch(clearUser()),
})

const RootWidthAuth = withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWidthAuth />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
