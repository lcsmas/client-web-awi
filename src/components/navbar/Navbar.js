import './Navbar.css'
import { Link } from 'react-router-dom'
import React from 'react'
import Button from '../button/Button'
import { connect } from 'react-redux';
import { getToken } from 'redux/selectors/selectors';
import { disconnectUser } from 'redux/slices/users'

const Navbar = (props) => {
    let connectBtn;
    let subscribeBtn;
    let disconnectBtn;
    if (!props.token) {
        connectBtn = (
            <Link to='/login'>
                <Button.NavbarHoverButton text='Se connecter' />
            </Link>
        );
        subscribeBtn = (
            <Link to='/subscribe'>
                <Button.NavbarHoverButton text="S'inscrire" />
            </Link>
        );
    } else {
        disconnectBtn = (
            <Button.NavbarHoverButton text='Se déconnecter' onClick={props.disconnectUser}/>
        )
    }
    return (
        <div className='Navbar'>
            <Link to='/' className='Navbar-title'> MoTee </Link>
            {connectBtn}
            {subscribeBtn}
            {disconnectBtn}
        </div>
    )
}

const mapStateToProps = state => {
    const token = getToken(state)
    return { token }
}
export default connect(mapStateToProps, {disconnectUser})(Navbar)