import React, { SyntheticEvent } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios"
import { Flex, Input, Alert } from "@fluentui/react-northstar";
import ButtonWithHistory from "./controls/ButtonWithHistory";

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

  handleSubmit(history: any) {
    const { username, password } = this.state;
    if (username && password) {
      this.setState({
        isLoggingIn: true,
      });

      Axios.post('/api/reactjs/login', {
        username,
        password,
      }).then((res: AxiosResponse) => {
        console.log('Success', res);
        history.push('/shoes')
      }).catch((err: AxiosError) => {
        console.log('err', err);
        const errorMessage = err.response?.status ? 'Invalid username or password' : 'Something went wrong';
        this.setState({
          errorMessage
        });
      }).then(() => {
        console.log('Completed');
      });
    } else {
      this.setState({
        errorMessage: 'Username and password are required'
      });
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
            <ButtonWithHistory content={'login'}
                               disabled={this.state.isLoggingIn}
                               onClick={this.handleSubmit}/>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
