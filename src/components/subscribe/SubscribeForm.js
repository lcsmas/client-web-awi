import React from 'react'
import Input from '../input/Input'
import './SubscribeForm.css'
import Button from '../button/Button'
import { Link, Route, useRouteMatch } from 'react-router-dom';

function SubscribeForm(props) {
    return (
        <div className='SubscribeForm'>
            <h1>Inscription</h1>
            <Input placeholder='Pseudonyme' />
            <Input placeholder='Mot de passe' hide='true' />
            <Input placeholder='Confirmer mot de passe' hide='true' />
            <Input placeholder='Adresse mail' />
            <Input placeholder='Ville (optionnel)' />
            <Link to='/'>
                <Button.GreenHoverButton text="S'inscrire sur MoTee" />
            </Link>
        </div>
    )
}

export default SubscribeForm