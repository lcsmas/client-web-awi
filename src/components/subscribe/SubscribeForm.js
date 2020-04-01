import React from 'react'
import Input from '../input/Input'
import './SubscribeForm.css'
import Button from '../button/Button'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { getUsersConnectionState } from "redux/selectors/selectors";
import { registerUser } from 'redux/slices/users'

class SubscribeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: '',
            mdp: '',
            mdpConfirm: '',
            mail: '',
            ville: ''
        }
        this.handlePseudoChange = this.handlePseudoChange.bind(this);
        this.handleMdpChange = this.handleMdpChange.bind(this);
        this.handleConfirmMdpChange = this.handleConfirmMdpChange.bind(this);
        this.handleMailChange = this.handleMailChange.bind(this);
        this.handleVilleChange = this.handleVilleChange.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }
    handlePseudoChange = e => { this.setState({ pseudo: e.target.value }) }
    handleMdpChange = e => { this.setState({ mdp: e.target.value }) }
    handleConfirmMdpChange = e => { this.setState({ mdpConfirm: e.target.value }) }
    handleMailChange = e => { this.setState({ mail: e.target.value }) }
    handleVilleChange = e => { this.setState({ ville: e.target.value }) }
    handleRegisterClick = () => { this.props.registerUser(this.state.pseudo, this.state.mdp, this.state.mail) }

    render() {
        let registerSuccessNotice;
        if(this.props.registerSuccess) {
            registerSuccessNotice = <div className='register-success-notice'>
                Votre compte a bien été enregistré ! 
                Vous allez être redirigé vers la page d'accueil dans 5 secondes.
            </div>
        }

        return this.props.registerSuccess ? setTimeout(<Redirect to='/' />, 3000) : (
            <div className='SubscribeForm'>
                {registerSuccessNotice}
                <h1>Inscription</h1>
                <Input placeholder='Pseudonyme' onChange={this.handlePseudoChange} />
                <Input placeholder='Mot de passe' type='password'  onChange={this.handleMdpChange} />
                <Input placeholder='Confirmer mot de passe' type='password' onChange={this.handleConfirmMdpChange} />
                <Input placeholder='Adresse mail' onChange={this.handleMailChange} />
                <Input placeholder='Ville (optionnel)' onChange={this.handleVilleChange} />
                <Link to='/'>
                    <Button.GreenHoverButton text="S'inscrire sur MoTee" onClick={this.handleRegisterClick} />
                </Link>
            </div>
        )
    }
}
const mapState = state => {
    const registerSuccess = getUsersConnectionState(state).registerSuccess
    return { registerSuccess }
}
export default connect(mapState, { registerUser })(SubscribeForm)