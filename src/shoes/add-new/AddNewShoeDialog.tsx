import React, { SyntheticEvent } from "react";
import {
  Button,
  Dialog,
  Form,
  CloseIcon,
  FormButton,
  FormInput, Flex
} from "@fluentui/react-northstar";
import { AddIcon } from "@fluentui/react-icons-northstar";
import './AddNewShoeDialog.css';
import Axios, { AxiosResponse, AxiosError } from 'axios';

interface IState {
  isDialogOpen: boolean;
  isSaving: boolean;
  form: {
    brand: string,
    name: string,
    color: string,
    price: number,
    image: string,
    size: string,
  };
}

export class AddNewShoeDialog extends React.Component {
  props: any;
  state: IState = {
    isDialogOpen: false,
    isSaving: false,
    form: {
      brand: '',
      name: '',
      color: '',
      price: 0,
      image: '',
      size: '',
    },
  }

  constructor(props: any) {
    super(props);
    this.props = props;

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onFormSubmit() {
    if (this.state.isSaving) {
      return;
    }

    console.log(this.state.form);
    this.setState({
      isSaving: true,
    });

    Axios.post(`api/reactjs/shoes`, this.state.form)
      .then((res: AxiosResponse) => {
        console.log('res', res);
        // close dialog and pass the data to the user
        this.setState({
          isDialogOpen: false,
          isSaving: false,
          form: {
            brand: '',
            name: '',
            color: '',
            price: 0,
            image: '',
            size: '',
          },
        });
        this.props.onCreateSuccess(res.data);
      })
      .catch((err: AxiosError) => {
        console.log('err', err);
      })
      .finally(() => {
        console.log('completed');
      });
  }

  onInputChange(e: SyntheticEvent<any>) {
    const element = e.target as HTMLInputElement;
    const name = element.name;
    const value = element.type === 'text' ? element.value : Number(element.value);
    this.setState((state: IState) => ({
      form: {
        ...state.form,
        [name]: value
      }
    }))
  }

  render() {
    const content = (
      <div>
        <Form onSubmit={(e) => this.onFormSubmit()}>
          <div>
            <Flex column={true}
                  gap={'gap.small'}
                  className={'form-content-container'}>
              <FormInput label={'Brand'}
                         type={'text'}
                         name={'brand'}
                         value={this.state.form.brand}
                         onChange={this.onInputChange}
                         fluid
                         required />
              <FormInput label={'Name'}
                         type={'text'}
                         name={'name'}
                         value={this.state.form.name}
                         onChange={this.onInputChange}
                         fluid
                         required />
              <FormInput label={'Size'}
                         type={'text'}
                         name={'size'}
                         value={this.state.form.size}
                         onChange={this.onInputChange}
                         fluid
                         required />
              <FormInput label={'Color'}
                         type={'text'}
                         name={'color'}
                         value={this.state.form.color}
                         onChange={this.onInputChange}
                         fluid
                         required />
              <FormInput label={'Image'}
                         type={'text'}
                         name={'image'}
                         value={this.state.form.image}
                         onChange={this.onInputChange}
                         fluid
                         required />
              <FormInput label={'Price'}
                         type={'number'}
                         name={'price'}
                         value={this.state.form.price}
                         onChange={this.onInputChange}
                         fluid
                         required />
              <Flex hAlign={'end'}>
                <FormButton content={'Save'} primary={true} />
              </Flex>
            </Flex>
          </div>
        </Form>
      </div>
    );
    return (
      <Dialog open={this.state.isDialogOpen}
              header={'Create Shoe'}
              content={content}
              onCancel={(e) => { this.setState({isDialogOpen: false}) }}
              headerAction={{
                icon: <CloseIcon />,
                title: 'Close',
                onClick: () => { this.setState({isDialogOpen: false}) },
              }}
              trigger={
                <Button icon={<AddIcon />}
                        content="Create Shoe"
                        onClick={
                          (e) => { this.setState({isDialogOpen: true}) }
                        } />
              } />
    );
  }
}
