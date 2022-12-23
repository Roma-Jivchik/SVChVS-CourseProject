import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../NavMenu.css';

export class PlayersByPositionView extends Component {
    static displayName = PlayersByPositionView.name;

    constructor(props) {
        super(props);

        this.state = {
            players: [],
            position: "",
            isSearching: false,
            isValidated: false,
            id: 0
        }

        this.getPlayersByPosition = this.getPlayersByPosition.bind(this);
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
                                        <Form.Label size="sm" className="text">Введите позицию игрока</Form.Label>
                                        <Form.Control size="sm" type="text" name="position" value={this.state.position} placeholder={this.state.position} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                </fieldset>
                            </Col>
                        </Row>
                        <Button variant="light" style={{ marginBottom: 10, marginLeft: 60 }}
                            onClick={() => this.getPlayersByPosition(this.state.position)}>
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
                                <th>Оценка игрока</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.players.map((player, id) =>
                                <tr key={player.id} onClick={() => { this.props.handleChoose(player) }}>
                                    <td>{id + 1}</td>
                                    <td>{player.firstName}</td>
                                    <td>{player.lastName}</td>
                                    <td>{player.averageMark}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </fieldset>
            </div>
        );
    }

    async getPlayersByPosition(position) {
        console.log("Getting");

        const response = await fetch('player/get-by-position', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(position)
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
            this.getPlayersByPosition(this.state.position);

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
