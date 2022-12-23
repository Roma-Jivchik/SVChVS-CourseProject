import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { PlayersTableView } from './PlayersTableView';

export class PlayersTable extends Component {
    static displayName = PlayersTable.name;

    constructor(props) {
        super(props);

        this.state = {
            player:{}
        }

        this.handleChoose = this.handleChoose.bind(this);
    }

    render() {
        return (
            <div hidden={this.props.isHidden}>
                <Button variant="light" style={{ marginBottom: 10,  marginTop:10 }} onClick={(event) => this.handleAdd(event)}>
                    Добавить
                </Button>
                <PlayersTableView
                    players={this.props.players}
                    handleChoose={this.handleChoose}
                    handleExamine={this.props.handleExamine}
                    handleUpdate={this.props.handleUpdate}
                    handleDelete={this.props.handleDelete}
                />
            </div>
        );
    }

    handleChoose(player) {
        this.setState(
            {
                player: player
            }
        )

        this.props.handleChoose(player);
    }

    handleAdd(event) {
        event.preventDefault();
        this.props.handleAdd();
    }
}
