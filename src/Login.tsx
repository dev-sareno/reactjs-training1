import React, { SyntheticEvent } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios"
import { Flex, Button, Input, Alert } from "@fluentui/react-northstar";
import { withRouter } from "react-router-dom";
import MsLinkButton from "./controls/MsLinkButton";

export class Login extends React.Component {
  state = {
    username: '',
    password: '',
    errorMessage: null,
    isLoggingIn: false,
  }

  constructor(props: any) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  async handleSubmit(): Promise<boolean> {
    const { username, password } = this.state;
    if (username && password) {
      this.setState({
        isLoggingIn: true,
      });

      try {
        const login = await Axios.post('/api/reactjs/login', {
          username,
          password,
        });
        console.log('Success', login);
        this.setState({
          errorMessage: null,
        });
        return true;
      } catch (err) {
        console.log('err', err);
        const errorMessage = err.response?.status ? 'Invalid username or password' : 'Something went wrong';
        this.setState({
          errorMessage
        });
        return false;
      } finally {
        console.log('Completed');
        this.setState({
          isLoggingIn: false,
        });
      }
    } else {
      this.setState({
        errorMessage: 'Username and password are required'
      });
      return false;
    }
  }

  onInputChange(e: SyntheticEvent) {
    const elem = e.target as HTMLInputElement;
    const name = elem.name;
    const value = elem.value;
    this.setState({
      [name]: value,
      errorMessage: null,
      isLoggingIn: false,
    });
  }

  render() {
    return (
      <Flex gap="gap.small"
            hAlign={'center'}>
        <Flex className={'Login-box'} column={true} gap={'gap.small'}>
          <h1>Login</h1>
          <Input type={'text'} label={'Username'} name={'username'} fluid onChange={this.onInputChange}/>
          <Input type={'password'} label={'Password'} name={'password'} fluid onChange={this.onInputChange}/>
          {this.state.errorMessage
          && <Alert
              content={this.state.errorMessage}
              variables={{
                oof: true,
              }}
          />}
          <Flex className={'Login-submit-container'} hAlign={'end'}>
            <MsLinkButton content={'login'} disabled={this.state.isLoggingIn} url={'/shoes'} callback={() => this.handleSubmit()}/>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
