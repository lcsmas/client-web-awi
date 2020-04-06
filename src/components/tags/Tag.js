import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTagById } from 'redux/selectors/selectors'
import './Tag.css'

const Tag = (props) => {
    const tag = props.tag
    return (
        <div className='tag'>
            #{tag.title}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    tag: getTagById(state, ownProps.id)
})

export default connect(mapStateToProps)(Tag)
