import React, { SyntheticEvent } from "react";
import Axios, { AxiosResponse } from "axios"
import { Flex, Button, Input } from "@fluentui/react-northstar";

export class Login extends React.Component {
  state = {
    username: '',
    password: '',
    errorMessage: null,
  }

  constructor(props: any) {
    super(props);

    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleInputChanged(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      errorMessage: null,
      isLoggingIn: false,
    });
  }

  handleSubmit() {
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
      }, (err: AxiosResponse) => {
        console.log('err', err.status);
        const errorMessage = err.status === 403 ? 'Invalid username or password' : 'Something went wrong';
        this.setState({
          errorMessage
        })
      }).then(() => {
        console.log('Completed');
        this.setState({
          isLoggingIn: true,
        });
      });
    } else {
      this.setState({
        errorMessage: 'Username and password are required'
      });
    }
  }

  onUsernameChange(e: SyntheticEvent) {
    const elem = e.target as HTMLInputElement;
    console.log(elem.value);
  }

  onPasswordChange(e: SyntheticEvent) {
    const elem = e.target as HTMLInputElement;
    console.log(elem.value);
  }

  render() {
    return (
      <Flex gap="gap.small"
            hAlign={'center'}>
        <Flex className={'Login-box'} column={true} gap={'gap.small'}>
          <h1>Login</h1>
          <Input type={'text'} label={'Username'} fluid onChange={this.onUsernameChange}/>
          <Input type={'password'} label={'Password'} fluid onChange={this.onPasswordChange}/>
          <Flex className={'Login-submit-container'} hAlign={'end'}>
            <Button content={'Login'} primary/>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
