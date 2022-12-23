import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../NavMenu.css';

export class TransfersByTeamView extends Component {
    static displayName = TransfersByTeamView.name;

    constructor(props) {
        super(props);

        this.state = {
            transfers: [],
            teamName:"",
            isSearching: false,
            isValidated:false,
            id: 0
        }

        this.getTransfersByTeam = this.getTransfersByTeam.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    render() {
        return (
            <div>
                <Form validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <fieldset hidden={this.props.isHidden}>
                            <Row>
                                <Col>
                                    <fieldset>
                                        <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Введите название команды</Form.Label>
                                        <Form.Control size="sm" type="text" name="teamName" value={this.state.teamName} priceholder={this.state.teamName} onChange={this.handleChangeInput} required />
                                        </Form.Group>
                                    </fieldset>
                                </Col>
                        </Row>
                        <Button variant="light" style={{ marginBottom: 10,marginLeft:60 }}
                            onClick={() => this.getTransfersByTeam(this.state.teamName)}>
                            Поиск
                        </Button>
                        </fieldset>
                </Form>
                <fieldset hidden={!this.state.isSearching}>
                    <Button variant="light" style={{ marginBottom: 10, marginTop: 10 }}
                        onClick={() => this.handleBack()}>
                        Назад к поиску
                    </Button>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Игрок</th>
                                <th>Откуда</th>
                                <th>Куда</th>
                                <th>Цена</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.transfers.map((transfer, id) =>
                                <tr key={transfer.id} onClick={() => { this.props.handleChoose(transferList) }}>
                                    <td>{id + 1}</td>
                                    <td>{transfer.playerName}</td>
                                    <td>{transfer.fromTeam}</td>
                                    <td>{transfer.toTeam}</td>
                                    <td>{transfer.price}$</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </fieldset>
            </div>
        );
    }

    async getTransfersByTeam(team) {
        console.log("Getting");

        const response = await fetch('transferList/get-by-team', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(team)
        });

        const responseData = await response.json();

        this.setState({ transfers: responseData })
        this.setState({ isSearching: !this.state.isSearching })
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            this.getTransfersByTeam(this.state.teamName);

            this.setState({ validated: true });
        }
    }

    handleBack() {
        this.setState({ isSearching: !this.state.isSearching })
    }

    handleChangeInput(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
}