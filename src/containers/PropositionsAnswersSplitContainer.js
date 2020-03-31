import React from 'react'
import AnswersView from "../components/answers/AnswersView";
import PropositionView from "../components/propositions/PropositionView";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'
import { getSelectedProposition } from "../redux/selectors/selectors";

const PropositionsAnswersSplitContainer = (props) => {
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <PropositionView />
                </Col>
                <Col md={7}>
                    {props.selectedProp && <AnswersView />}
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => {
    const selectedProp = getSelectedProposition(state)
    return { selectedProp }
}
export default connect(mapStateToProps)(PropositionsAnswersSplitContainer)
