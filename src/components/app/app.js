import React from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';

import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, HousePage, BookPage, BooksItem} from '../pages';

import gotService from '../../services/gotService';


export default class App extends React.Component {
    gotService = new gotService();
    
    state = {
        visible: true,
        text: 'Скрыть',
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    onVisible = () => {
        this.setState(({visible}) => {
            const newVis = !visible;
            const newText = visible ? 'Показать' : 'Скрыть' ;
            return {
                visible: newVis,
                text: newText
            }
        })
    }

    

    render () {
        const {visible, text} = this.state;
        const view = visible ? <RandomChar/> : null;

        if (this.state.error) {
            return (
                <ErrorMessage/>
            )
        }

        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 3, offset: 3}}>
                                <Button 
                                    color="secondary" 
                                    block
                                    onClick = {this.onVisible}
                                >{text}</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{size: 6, offset: 0}}>
                                {view}
                            </Col>
                        </Row>
                        <Route path="/characters" component={CharacterPage} />
                        <Route path="/houses" component={HousePage} />
                        <Route path="/books" exact component={BookPage} />
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id} />
                            } 
                        } />
                    </Container>
                </div> 
            </Router>
            
        );
    }
    
};