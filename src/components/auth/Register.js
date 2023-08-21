import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Header,
  Form,
  Icon,
  Segment,
  Message,
} from "semantic-ui-react";
import firebase from "../../firebase";
import md5 from "md5";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    loading: false,
    errors: [],
    userRef: firebase.database().ref("users"),
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      const { username, email, password, errors } = this.state;
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          console.log(createdUser);

          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("user saved");
                this.setState({ loading: false });

                window.location.href = '/login';
              });
            });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ errors: [...errors, err], loading: false });
        });
    }
  };

  saveUser = (createdUser) => {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  isFormValid() {
    let errors = [];
    let error;
    const { username, email, password, passwordConfirmation } = this.state;

    if (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    ) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (
      password.length < 6 ||
      passwordConfirmation.length < 6 ||
      password !== passwordConfirmation
    ) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    }

    return true;
  }

  displayError = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    const { username, password, email, passwordConfirmation, loading } =
      this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange">
            <Icon name="puzzle piece" color="orange"></Icon>
            Register for WorkList
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                type="username"
                value={username}
                onChange={this.handleChange}
                className={this.handleInputError(this.state.errors, "username")}
              ></Form.Input>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={this.handleChange}
                className={this.handleInputError(this.state.errors, "email")}
              ></Form.Input>
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={this.handleChange}
                className={this.handleInputError(this.state.errors, "password")}
              ></Form.Input>
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={this.handleChange}
                className={this.handleInputError(
                  this.state.errors,
                  "passwordConfirmation"
                )}
              ></Form.Input>
              <Button
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>

          {this.state.errors.length > 0 && (
            <Message>
              <h3>Error</h3>
              {this.displayError(this.state.errors)}
            </Message>
          )}

          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
