import React from 'react';
import { connect } from 'react-redux';
import Button from "../button/Button";
import TextArea from "../input/TextArea";
import Input from "../input/Input";
import './AddProposition.css';
import { postProposition, fetchPropositions } from "redux/slices/propositions";
import { getCurrentUserId } from '../../redux/selectors/selectors';


class AddProposition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            isAnon: false,
            tags: ""
        }
    }
    updateTitle(value) {
        this.setState({ title: value });
    }
    updateContent(value) {
        this.setState({ content: value });
    }
    updateCheckbox(checked) {
        this.setState({ isAnon: checked });
    }
    updateTags(value) {
        this.setState({ tags: value });
    }
    handleAddProposition() {
        const data = {
            title: this.state.title,
            content: this.state.content,
            isAnon: this.state.isAnon,
            tags: this.state.tags.split(" ").filter( tag => tag!==""), 
            owner: this.props.user
        }
        this.props.postProposition(data)
            .then(() => {
                this.props.fetchPropositions()
            });
    }
    render() {
        return (
            <div className="add-proposition">
                <h2 > Ajouter un propos </h2>
                <Input placeholder="Titre du propos" value={this.state.title} onChange={e => this.updateTitle(e.target.value)} />
                <TextArea rows="5" cols="92" onChange={e => this.updateContent(e.target.value)} value={this.state.content}
                    placeholder="Contenu du propos"
                />
                <Input placeholder="Tags séparé par un espace" value={this.state.tags} onChange={e => this.updateTags(e.target.value)} />
                <div className="add-proposition-checkbox">
                    <input name='isAnon' type='checkbox' checked={this.state.isAnon}
                        onChange={e => this.updateCheckbox(e.target.checked)} />
                    <label htmlFor='isAnon'> Publier anonymement </label>
                </div>
                <div className="add-proposition-button">
                    <Button.BlueSquaredButton text='Publier votre réponse'
                        onClick={() => this.handleAddProposition()}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: getCurrentUserId(state)
})

const mapDispatchToProps = {
    postProposition,
    fetchPropositions
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProposition)
