import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../admin/Navbar'
import { Route, Switch } from 'react-router-dom';
import ManageBan from "../admin/ManageBan";
import ManageReport from "../admin/ManageReport";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Admin = () => {
    return (
        <Container fluid className='admin'>
            <Row>
                <Col className='sticky-top' md={3}>
                    <Navbar />
                </Col>
                <Col md={6}>
                    <Switch>
                        <Route path='/admin/manage-report' component={ManageReport} />
                        <Route path='/admin/manage-ban' component={ManageBan} />
                    </Switch>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
