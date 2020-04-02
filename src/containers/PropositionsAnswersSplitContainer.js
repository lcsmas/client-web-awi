import React from 'react'
import AnswersView from "../components/answers/AnswersView";
import PropositionView from "../components/propositions/PropositionView";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { connect } from 'react-redux'
import { getSelectedProposition, getPropositionsFetchState, getToken, getPropositionsList } from "redux/selectors/selectors";

const PropositionsAnswersSplitContainer = (props) => {
    const { error: networkError } = props.fetchState || false;
    return (
        <Container fluid >
            {networkError &&
                <Row className="justify-content-md-center">
                    <Alert variant='danger'>Erreur réseau : {networkError}</Alert>
                </Row>}
            {!props.isConnected &&
                <Row className="justify-content-md-center">
                    <Alert variant='warning'> Vous êtes en mode hors ligne, connectez vous pour publier ou aimer du contenu !</Alert>
                </Row>}
            {props.propositions &&
                <Row>
                    <Col md={3}>
                        <PropositionView />
                    </Col>
                    <Col md={7}>
                        {props.selectedProp && <AnswersView />}
                    </Col>
                </Row>}
            {!props.propositions &&
                <Row className="justify-content-md-center">
                    <p>Il n'y a pas de propositions pour le moment, soyez le premier à publier !!</p>
                </Row>}
        </Container>
    )
}

const mapStateToProps = state => {
    const selectedProp = getSelectedProposition(state)
    const fetchState = getPropositionsFetchState(state)
    const isConnected = getToken(state)
    const propositions = getPropositionsList(state)
    return { selectedProp, fetchState, isConnected, propositions }
}
export default connect(mapStateToProps)(PropositionsAnswersSplitContainer)
