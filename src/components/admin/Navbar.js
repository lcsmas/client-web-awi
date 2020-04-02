import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='nav-admin'>
            <ul>
                <Link to='/admin/manage-report' > <li>Signalements</li> </Link>
                <Link to='/admin/manage-ban' > <li>Bannissements</li> </Link>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
