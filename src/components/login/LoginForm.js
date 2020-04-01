import React from 'react'
import './LoginForm.css'
import Input from '../input/Input';
import Button from '../button/Button';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { connectUser } from 'redux/slices/users';
import { getCurrentUserId } from 'redux/selectors/selectors';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            mdp: ''
        }
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleMdpChange = this.handleMdpChange.bind(this);
        this.handleConnection = this.handleConnection.bind(this);
        this.handleSubscribe = this.handleSubscribe.bind(this);
    }
    handleLoginChange(e) {
        this.setState({ login: e.target.value })
    }
    handleMdpChange(e) {
        this.setState({ mdp: e.target.value })
    }
    handleConnection(e) {
        const pseudo = this.state.login
        const mdp = this.state.mdp
        this.props.connectUser(pseudo, mdp);
    }
    handleSubscribe(e) {

    }
    render() {
        if (this.props.currentUserId){
            return (<Redirect to='/'/>);
        }
        return (
            <div className="LoginForm">
                <h1>Connexion</h1>
                <Input placeholder="Pseudonyme" onChange={this.handleLoginChange} />
                <Input placeholder="Mot de passe" type='password' onChange={this.handleMdpChange} />
                <Button.BlueSquaredButton text="Se connecter" onClick={this.handleConnection} />
                <Link to='subscribe'>
                    <Button.BlueSquaredButton text="Pas de compte ? Inscrivez-vous !" />
                </Link>
            </div>)
    }
}

export default connect(state => {
    const currentUserId = getCurrentUserId(state);
    return { currentUserId };
}, {connectUser})(LoginForm)