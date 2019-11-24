import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
// import './itemDetails.css';

import gotService from '../../services/gotService';
import Spinner from '../spinner';


const TermSpan = styled.span`
    font-weight: bold;
`;

const ItemDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const SelectError = styled.div`
    color: black;
    text-align: center;
    font-size: 26px;
`;

const Field = ({item, field, label}) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <TermSpan>{label}</TermSpan>
            <span>{item[field]}</span>
        </ListGroupItem>
    )
}

export {Field}

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId} = this.props;
        const {getData} = this.props;
        
        if(!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
            
        // this.foo.bar = 0;
    }

    render() {

        if(!this.state.item) {
            return ( 
                <ItemDetailsBlock className="rounded">
                    <SelectError className='select-error'>Please select an item</SelectError>
                    <Spinner/>
                </ItemDetailsBlock>
            )
        }

        const {item} = this.state;
        const {name} = item;

        return (
            <ItemDetailsBlock className="rounded">
                <h4>{name}</h4>
                <ListGroup className="list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ListGroup>
            </ItemDetailsBlock>
        );
    }
}