import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../NavMenu.css';

export class PlayerFormView extends Component {
    static displayName = PlayerFormView.name;

    constructor(props) {
        super(props);

        this.state = {
            player: props.player,
            formStateAdding: "Добавление",
            formStateUpdating: "Обновление",
            formStateExamine: "Просмотр",
            id: props.player.id,
            firstName: props.player.firstName,
            lastName: props.player.lastName,
            position: props.player.position,
            averageMark: props.player.averageMark,
            team: props.player.team,
            validated: false
        };

        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.createPlayerModel = this.createPlayerModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div hidden={ this.props.isHidden}>
                <Button variant="light" style={{ marginTop: 7 }} onClick={(event) => this.props.handleBack(event)}>
                    Назад к списку
                </Button>
                <p className="text">{this.props.isAdding ? this.state.formStateAdding :
                    this.props.isUpdating ? this.state.formStateUpdating :
                        this.state.formStateExamine}</p>
                <Form validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <fieldset disabled={!this.props.isUpdating && !this.props.isAdding} hidden={ this.props.isHidden}>
                        <Row>
                            <Col>
                                <fieldset>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text" >Имя</Form.Label>
                                        <Form.Control size="sm" type="text" name="firstName" value={this.state.firstName} positionholder={this.state.player.firstName} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Фамилия</Form.Label>
                                        <Form.Control size="sm" type="text" name="lastName" value={this.state.lastName} positionholder={this.state.player.lastName} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Позиция</Form.Label>
                                        <Form.Control size="sm" type="text" name="position" value={this.state.position} positionholder={this.state.player.position} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                </fieldset>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <fieldset>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text" >Общая оценка</Form.Label>
                                        <Form.Control size="sm" type="number" name="averageMark" value={this.state.averageMark} positionholder={this.state.player.averageMark} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Команда</Form.Label>
                                        <Form.Control size="sm" type="text" name="team" value={this.state.team} positionholder={this.state.player.team} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                </fieldset>
                            </Col>
                            <fieldset>
                                <Button variant="light" style={{ paddingBottom: 10 }} type="submit" hidden={!this.props.isAdding && !this.props.isUpdating}>
                                    {this.props.isAdding ? "Добавить" : "Обновить"}
                                </Button>
                            </fieldset>
                            </Row>
                    </fieldset>
                </Form>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            let player = this.createPlayerModel();

            this.props.isAdding ? this.props.handlePost(event, player) :
                this.props.handleUpdate(event, player);

            this.setState({validated: true});
        }
    }

    createPlayerModel() {
        let player = {
            "id": "_",
            "lastName": this.state.lastName,
            "firstName": this.state.firstName,
            "position": this.state.position,
            "averageMark": this.state.averageMark,
            "team": this.state.team
        }

        return player;
    }

    handleChangeInput(event) {
        this.setState({[event.target.name]:event.target.value});
    }
}
