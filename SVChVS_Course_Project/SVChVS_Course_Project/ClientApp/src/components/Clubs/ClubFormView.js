import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../NavMenu.css';

export class ClubFormView extends Component {
    static displayName = ClubFormView.name;

    constructor(props) {
        super(props);

        this.state = {
            club: props.club,
            formStateAdding: "Добавление",
            formStateUpdating: "Обновление",
            formStateExamine: "Просмотр",
            id: props.club.id,
            name: props.club.name,
            description: props.club.description,
            history: props.club.history,
            place: props.club.place,
            stadium: props.club.stadium,
            league: props.club.league,
            photo: "",
            imagePreviewUrl: "",
            validated: false
        };

        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.handleFile = this.handleFile.bind(this);
        this.createClubModel = this.createClubModel.bind(this);
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
                                        <Form.Label size="sm" className="text" >Название клуба</Form.Label>
                                        <Form.Control size="sm" type="text" name="name" value={this.state.name} placeholder={this.state.club.name} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Описание</Form.Label>
                                        <Form.Control size="sm" type="text" name="description" value={this.state.description} placeholder={this.state.club.description} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Краткая история</Form.Label>
                                        <Form.Control size="sm" type="textarea" name="history" value={this.state.history} placeholder={this.state.club.history} onChange={this.handleChangeInput} />
                                    </Form.Group>
                                </fieldset>
                            </Col>
                            <Col>
                                <fieldset>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Название стадиона</Form.Label>
                                        <Form.Control size="sm" type="text" name="stadium" value={this.state.stadium} placeholder={this.state.club.stadium} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Место в таблице</Form.Label>
                                        <Form.Control size="sm" type="number" name="place" value={this.state.place} placeholder={this.state.club.place} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Название турнира</Form.Label>
                                        <Form.Control size="sm" type="text" name="league" value={this.state.league} placeholder={this.state.club.league} onChange={this.handleChangeInput} required />
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
            let club = this.createClubModel();

            this.props.isAdding ? this.props.handlePost(event, club) :
                this.props.handleUpdate(event, club);

            this.setState({validated: true});
        }
    }

    createClubModel() {
        let club = {
            "id": "_",
            "name": this.state.name,
            "description": this.state.description,
            "history": this.state.history,
            "organisation": this.state.organisation,
            "department": this.state.department,
            "stadium": this.state.stadium,
            "place": this.state.place,
            "league": this.state.league
        }

        return club;
    }

    handleChangeInput(event) {
        this.setState({[event.target.name]:event.target.value});
    }

    handleFile(file) {
        this.setState({ photo: file});
    }
}
