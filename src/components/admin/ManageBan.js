import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import Input from 'components/input/Input'
import './ManageBan.css'
import Button from '../button/Button'
import Autocomplete from "react-autocomplete";
import { getUsers, getBannedUsers } from "redux/selectors/selectors";
import { banUser, fetchUsers } from 'redux/slices/users'

const ManageBan = (props) => {
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    return (
        <div className='manage-ban'>
            <h2>Utilisateur à bannir</h2>
            <Autocomplete 
                getItemValue = { u => `${u.name} - ${u.id}` }
                items = {props.users}
                renderItem={(u, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                      {`@${u.name} - ${u.id}`}
                    </div>
                  }
                value={name}
                onChange={(e) => setName(e.target.value) }
                onSelect={(val, u) => {
                    setId(u.id);
                    setName(val);
                }}
                shouldItemRender={(u, value) => u.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 }

            />
            <Button.RedButton text="Bannir l'utilisateur" onClick={ () => props.banUser(id).then(props.fetchUsers) } /> 
            <div className='banned-users'>
                <h2> Utilisateurs bannis </h2>
                {props.bannedUsers.map(u => <p key={u.id}> {u.name} </p>)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: getUsers(state),
    bannedUsers: getBannedUsers(state)
})

const mapDispatchToProps = {
    banUser, 
    fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBan)
