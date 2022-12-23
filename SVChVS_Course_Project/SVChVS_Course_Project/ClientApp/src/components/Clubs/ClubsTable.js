import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { ClubsTableView } from './ClubsTableView';

export class ClubsTable extends Component {
    static displayName = ClubsTable.name;

    constructor(props) {
        super(props);

        this.state = {
            club:{}
        }

        this.handleChoose = this.handleChoose.bind(this);
    }

    render() {
        return (
            <div hidden={this.props.isHidden}>
                <Button variant="light" style={{ marginBottom: 10,  marginTop:10 }} onClick={(event) => this.handleAdd(event)}>
                    Добавить
                </Button>
                <ClubsTableView
                    clubs={this.props.clubs}
                    handleChoose={this.handleChoose}
                    handleExamine={this.props.handleExamine}
                    handleUpdate={this.props.handleUpdate}
                    handleDelete={this.props.handleDelete}
                />
            </div>
        );
    }

    handleChoose(club) {
        this.setState(
            {
                club: club
            }
        )

        this.props.handleChoose(club);
    }

    handleAdd(event) {
        event.preventDefault();
        this.props.handleAdd();
    }
}
