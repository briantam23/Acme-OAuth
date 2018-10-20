import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { setAuth, deleteAuth, createAddress, deleteAddress } from '../store/actions';


class App extends Component {
    constructor() {
        super();
        this.state = {
            addressName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    componentDidMount() {
        const { setAuth } = this.props;
        setAuth();
    }
    handleChange(e) {
        this.setState({ addressName: e.target.value });
    }
    handleAdd(auth) {
        const { createAddress } = this.props;
        createAddress(this.state, auth);
        this.setState({ addressName: '' }); 
    }
    render() {
        const { addresses, auth, deleteAuth, createAddress, deleteAddress } = this.props;
        const { handleChange, handleAdd } = this;
        const { addressName } = this.state;
        return(
            <Fragment>
                <br/>
                <h1>Acme-OAuth</h1>
                <hr/><br/>
            {   
                !auth.name ? <Button href='/api/auth/github/' color='primary' >Login to Github to Create an Address Book!</Button>
                    : (                    
                        <Fragment>
                            <h2 style={{ color: 'white' }} >Welcome { auth.name }!</h2>
                            <Button onClick={ () => deleteAuth(auth) } color='danger' >Logout</Button>
                            <hr/>
                            <form>
                                <input onChange={ handleChange } value={ addressName } placeholder='Enter a Location' autoFocus ></input>
                                <Button color='primary' disabled={ !addressName }  onClick={ () => handleAdd(auth) } >Add</Button>
                            </form>
                            <br/>
                            <ListGroup>
                        {
                            auth.addresses.map(address => (
                                <ListGroupItem key={ address.id }>
                                    { address.addressName }
                                    <Button onClick={ () => deleteAddress(address) } color='danger' style={{ float: 'right' }} >Delete</Button>
                                </ListGroupItem>
                            ))
                        }
                            </ListGroup>
                        </Fragment>
                    )
            }
            </Fragment>
        )
    }
}

const mapStateToProps = ({ addresses, auth }) => ({ addresses, auth });

const mapDispatchToProps = ({ setAuth, deleteAuth, createAddress, deleteAddress });


export default connect(mapStateToProps, mapDispatchToProps)(App);