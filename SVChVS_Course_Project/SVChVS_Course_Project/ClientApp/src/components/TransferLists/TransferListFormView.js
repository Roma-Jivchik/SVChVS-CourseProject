import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../NavMenu.css';

export class TransferListFormView extends Component {
    static displayName = TransferListFormView.playerName;

    constructor(props) {
        super(props);

        this.state = {
            transferList: props.transferList,
            formStateAdding: "Добавление",
            formStateUpdating: "Обновление",
            formStateExamine: "Просмотр",
            id: props.transferList.id,
            playerName: props.transferList.playerName,
            fromTeam: props.transferList.fromTeam,
            toTeam: props.transferList.toTeam,
            price: props.transferList.price,
            photo: "",
            imagePreviewUrl: "",
            validated: false
        };

        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.handleFile = this.handleFile.bind(this);
        this.createTransferListModel = this.createTransferListModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div hidden={ this.props.isHidden}>
                <Button style={{ marginTop: 7 }} onClick={(event) => this.props.handleBack(event)}>
                    Назад к списку
                </Button>
                <p>{this.props.isAdding ? this.state.formStateAdding :
                    this.props.isUpdating ? this.state.formStateUpdating :
                        this.state.formStateExamine}</p>
                <Form validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <fieldset disabled={!this.props.isUpdating && !this.props.isAdding} hidden={ this.props.isHidden}>
                        <Row>
                            <Col>
                                <fieldset>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Игрок</Form.Label>
                                        <Form.Control size="sm" type="text" name="playerName" value={this.state.playerName} placeholder={this.state.transferList.playerName} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Цена</Form.Label>
                                        <Form.Control size="sm" type="number" name="price" value={this.state.price} placeholder={this.state.transferList.price} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                </fieldset>
                            </Col>
                            <Col>
                                <fieldset>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Куда</Form.Label>
                                        <Form.Control size="sm" type="text" name="toTeam" value={this.state.toTeam} placeholder={this.state.transferList.toTeam} onChange={this.handleChangeInput} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm" className="text">Откуда</Form.Label>
                                        <Form.Control size="sm" type="text" name="fromTeam" value={this.state.fromTeam} placeholder={this.state.transferList.fromTeam} onChange={this.handleChangeInput} required />
                                    </Form.Group>
                                </fieldset>
                            </Col>
                        </Row>
                        <Row>
                            <fieldset>
                                <Button style={{ paddingBottom: 10 }} type="submit" hidden={!this.props.isAdding && !this.props.isUpdating}>
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
            let transferList = this.createTransferListModel();

            this.props.isAdding ? this.props.handlePost(event, transferList) :
                this.props.handleUpdate(event, transferList);

            this.setState({validated: true});
        }
    }

    createTransferListModel() {
        let transferList = {
            "id": "_",
            "playerName": this.state.playerName,
            "fromTeam": this.state.fromTeam,
            "toTeam": this.state.toTeam,
            "price": this.state.price
        }

        return transferList;
    }

    handleChangeInput(event) {
        this.setState({ [event.target.name]:event.target.value});
    }

    handleFile(file) {
        this.setState({ photo: file});
    }
}
