import Button from '../button/Button'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Delete.css'

const Delete = () => {
    return (
        <div className='delete'>
            <Button.RedButton text='Supprimer' />
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Delete)
