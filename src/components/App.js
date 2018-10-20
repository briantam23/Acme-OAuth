import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { loadInitialAddresses, loadInitialUsers, createAddress, deleteAddress } from '../store/actions';


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
        const { loadInitialAddresses, loadInitialUsers } = this.props;
        loadInitialAddresses()
            .then(() => loadInitialUsers())
    }
    handleChange(e) {
        this.setState({ addressName: e.target.value });
    }
    handleAdd() {
        const { createAddress } = this.props;
        createAddress(this.state);
        this.setState({ addressName: '' }); 
    }
    render() {
        const { addresses, users, createAddress, deleteAddress } = this.props;
        const { handleChange, handleAdd } = this;
        const { addressName } = this.state;
        return(
            <Fragment>
                <br/>
                <h1>Acme-OAuth</h1>
                <br/>
                <Button href='/api/auth/github/' color='primary' >Login to Github to Create an Address Book!</Button>
            {   
                users[0] ? (
                    <Fragment>
                        <hr/><br/>
                        <h2>Welcome { users[0].name }!</h2>
                        <Button color='danger' >Logout</Button>
                        <hr/>
                        <form>
                            <input onChange={ handleChange } value={ addressName } placeholder='Enter a Location' autoFocus ></input>
                            <Button color='primary' disabled={ !addressName }  onClick={ () => handleAdd() } >Add</Button>
                        </form>
                        <br/>
                        <ListGroup>
                    {
                        addresses.map(address => (
                            <ListGroupItem key={ address.id }>
                                { address.addressName }
                                <Button onClick={ () => deleteAddress(address) } color='danger' style={{ float: 'right' }} >Delete</Button>
                            </ListGroupItem>
                        ))
                    }
                        </ListGroup>
                    </Fragment>
                ) : null
            }
            </Fragment>
        )
    }
}

const mapStateToProps = ({ addresses, users }) => ({ addresses, users });

const mapDispatchToProps = ({ loadInitialAddresses, loadInitialUsers, createAddress, deleteAddress });


export default connect(mapStateToProps, mapDispatchToProps)(App);