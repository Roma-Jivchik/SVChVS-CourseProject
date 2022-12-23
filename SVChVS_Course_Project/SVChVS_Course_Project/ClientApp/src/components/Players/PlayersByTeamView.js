import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../NavMenu.css';

export class PlayersByTeamView extends Component {
    static displayName = PlayersByTeamView.name;

    constructor(props) {
        super(props);

        this.state = {
            players: [],
            teamName:"",
            isSearching: false,
            isValidated:false,
            id: 0
        }

        this.getPlayersByTeam = this.getPlayersByTeam.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    render() {
        return (
            <div>
                <Form validated={this.state.isValidated} onSubmit={this.handleSubmit}>
                        <fieldset hidden={this.props.isHidden}>
                            <Row>
                                <Col>
                                    <fieldset>
                                        <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Введите название команды</Form.Label>
                                        <Form.Control size="sm" type="text" name="teamName" value={this.state.teamName} placeholder={this.state.teamName} onChange={this.handleChangeInput} required />
                                        </Form.Group>
                                    </fieldset>
                                </Col>
                        </Row>
                        <Button variant="light" style={{ marginBottom: 10, marginLeft:60 }}
                            onClick={() => this.getPlayersByTeam(this.state.teamName)}>
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
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Команда</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.players.map((player, id) =>
                                <tr key={player.id} onClick={() => { this.props.handleChoose(player) }}>
                                    <td>{id + 1}</td>
                                    <td>{player.firstName}</td>
                                    <td>{player.lastName}</td>
                                    <td>{player.team}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </fieldset>
            </div>
        );
    }

    async getPlayersByTeam(team) {
        console.log("Getting");

        const response = await fetch('player/get-by-team', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(team)
        });

        const responseData = await response.json();

        this.setState({ players: responseData })
        this.setState({ isSearching: !this.state.isSearching })

    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            this.getPlayersByTeam(this.state.teamName);

            this.setState({ isValidated: true });
        }
    }

    handleBack() {
        this.setState({ isSearching: !this.state.isSearching })
    }

    handleChangeInput(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
}