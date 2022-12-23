import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../NavMenu.css';

export class MatchFormView extends Component {
    static displayName = MatchFormView.name;

    constructor(props) {
        super(props);

        this.state = {
            match: props.match,
            formStateAdding: "Добавление",
            formStateUpdating: "Обновление",
            formStateExamine: "Просмотр",
            id: props.match.id,
            firstTeamPlayed: props.match.firstTeamPlayed,
            secondTeamPlayed: props.match.secondTeamPlayed,
            result: props.match.result,
            validated: false
        };

        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.createMatchModel = this.createMatchModel.bind(this);
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
                                        <Form.Label size="sm" className="text" >Хозяева</Form.Label>
                                        <Form.Control size="sm" type="text" name="firstTeamPlayed" value={this.state.firstTeamPlayed} resultholder={this.state.match.firstTeamPlayed} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Гости</Form.Label>
                                        <Form.Control size="sm" type="text" name="secondTeamPlayed" value={this.state.secondTeamPlayed} resultholder={this.state.match.secondTeamPlayed} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Результат</Form.Label>
                                        <Form.Control size="sm" type="text" name="result" value={this.state.result} resultholder={this.state.match.result} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                </fieldset>
                            </Col>
                        </Row>
                        <Row>
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
            let match = this.createMatchModel();

            this.props.isAdding ? this.props.handlePost(event, match) :
                this.props.handleUpdate(event, match);

            this.setState({validated: true});
        }
    }

    createMatchModel() {
        let match = {
            "id": "_",
            "secondTeamPlayed": this.state.secondTeamPlayed,
            "firstTeamPlayed": this.state.firstTeamPlayed,
            "result": this.state.result,
        }

        return match;
    }

    handleChangeInput(event) {
        this.setState({[event.target.name]:event.target.value});
    }
}
