import React from 'react';
import { connect } from 'react-redux';
import {
    getPropositionById, getUserById,
    getSliceById,
    getSelectedProposition
} from "../../redux/selectors/selectors";
import { ENTITIES } from "../../redux/schema";
import './Proposition.css'
import { selectProposition } from 'redux/slices/propositions'

function Proposition(props) {
    const { id, title, content, isAnon } = props.proposition;
    const owner = props.owner;
    const tags = props.tags;
    const selectedProp = props.selectedProp;
    const nbLikes = props.nbLikes

    return (
        <div className={selectedProp === id ? "proposition selected" : "proposition"} onClick={() => props.selectProposition(id)}>
            <div className="proposition-title">{title} <a href="" className='proposition-owner'>
                {!isAnon && <> @{owner.name} </>}
                {isAnon && <> @anon </>}
            </a></div>
            <p className='proposition-like'>  {nbLikes} J'aime</p>
            <p className="proposition-content">{content}</p>
            <ul>{tags && Object.entries(tags).map(value => <li key={value[0]} >#{value[1].title}</li>)}</ul>
        </div>

    )
}

const mapStateToProps = (state, ownProp) => {
    const proposition = getPropositionById(state, ownProp.id);
    const owner = getUserById(state, proposition.owner);
    const tags = proposition.tags.map(tagId => getSliceById(state, ENTITIES.TAGS, tagId));
    const selectedProp = getSelectedProposition(state)
    const nbLikes = proposition.idLikes.length
    return { proposition, owner, tags, selectedProp, nbLikes }
}

export default connect(mapStateToProps, { selectProposition })(Proposition)
