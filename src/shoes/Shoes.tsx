import React from "react";
import Axios, { AxiosResponse, AxiosError } from "axios";
import { Divider, Header, Flex, Image, Text, Button } from '@fluentui/react-northstar';
import { AddIcon } from '@fluentui/react-icons-northstar'
import './Shoes.css';
import { AddNewShoeDialog } from "./add-new/AddNewShoeDialog";

interface IState {
  shoes: {
    _id: string,
    brand: string,
    size: string,
    color: string,
    name: string,
    image: string,
    price: number,
  }[];
  isCollectingData: boolean;
}

export class Shoes extends React.Component {
  state: IState = {
    shoes: [],
    isCollectingData: true,
  }
  private wrapper: React.RefObject<any>;

  constructor(props: any) {
    super(props);

    this.wrapper = React.createRef();
    this.onShoeClick = this.onShoeClick.bind(this);
    this.onShoeCreateSuccess = this.onShoeCreateSuccess.bind(this);
  }

  componentDidMount() {
    Axios.get(`api/reactjs/shoes`)
      .then((res: AxiosResponse) => {
        console.log('res', res);
        this.setState({
          shoes: res.data,
          isCollectingData: false,
        });
      })
      .catch((err: AxiosError) => {
        console.log('err', err);
      })
      .then(() => {
        console.log('complete');
      });
  }

  componentWillUnmount() {

  }

  onShoeClick(shoe: any) {

  }

  onShoeCreateSuccess(shoe: any) {
    this.setState((state: IState) => (
      {
        shoes: state.shoes.concat(shoe),
      }
    ));
  }

  render() {
    const items = this.state.shoes.map((shoe, index) => (
      <div key={shoe._id}>
        <Flex gap={'gap.small'}>
          <div className={'Shoes-img-container'}>
            <Image fluid src={shoe.image} />
          </div>
          <Flex fill={true} column={true}>
            <Text size={'large'} content={`${shoe.name}`} />
            <Text size={'medium'} content={`Size: ${shoe.size}`} />
            <Text size={'medium'} content={`Color: ${shoe.color}`} />
            <Text size={'medium'} content={`Price: $${shoe.price}`} />
          </Flex>
        </Flex>
        {index + 1 < this.state.shoes.length && <Divider className={'Shoes-item-divider'}/>}
      </div>
    ))
    return (
      <div>
        <Header content="Shoes" />
        <Flex className={'add-new-shoe-wrapper'} hAlign={'end'}>
          <AddNewShoeDialog onCreateSuccess={this.onShoeCreateSuccess} />
        </Flex>
        {items}
      </div>
    );
  }
}
