import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Tags.css'
import Tag from './Tag';

export const Tags = (props) => {
    const ids = props.ids;
    return (
        <div className='tags'>
            {ids.map(id => <Tag id={id} />)}
        </div>
    )
}