import Button from '../button/Button'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Delete.css'

const Delete = props => {
    return (
        <div className='delete'>
            <Button.RedButton text='Supprimer' />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    if(ownProps.type === 'answer')
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Delete)
