import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import { PlayerForm} from './PlayerForm';
import { PlayersTable} from './PlayersTable';

export class PlayersPage extends Component {
    static displayName = PlayersPage.name;

    constructor(props) {
        super(props);

        this.state = {
            players: [],
            player: {},
            isDisplayTable: true,
            isDisplayForm: false,
            isAdding: false,
            isUpdating: false,
        };

        this.handleChoose = this.handleChoose.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.clearState = this.clearState.bind(this);

        this.getPlayers = this.getPlayers.bind(this);
        this.deletePlayer = this.deletePlayer.bind(this);
    }

    componentDidMount() {
        this.getPlayers();
    }

    clearState() {
        this.setState(
            {
                player: {},
                isDisplayTable: true,
                isDisplayForm: false,
                isAdding: false,
                isUpdating: false,
            }
        );
    }

    render() {
        return (
            <Row>
                { this.state.isDisplayTable ?
                <PlayersTable
                    handleChoose={this.handleChoose}
                    players={this.state.players}
                    isHidden={!this.state.isDisplayTable}
                    handleAdd={this.handleAdd}
                    handleDelete={this.handleDelete}
                    handleUpdate={ this.handleUpdate}
                />
                    :
                <PlayerForm
                    player={ this.state.player}
                    isHidden={!this.state.isDisplayForm}
                    handleBack={this.handleBack}
                    isUpdating={this.state.isUpdating}
                    isAdding={this.state.isAdding}
                />
                }
            </Row>
        );
    }

    handleAdd() {
        this.setState(
            {
                player: {},
                isDisplayTable: false,
                isDisplayForm: true,
                isAdding:true,
            }
        );
    }

    handleBack() {
        this.clearState();

        this.getPlayers();
    }

    handleChoose(currentPlayer) {
        if (event.target.name != "btn-delete") {
            this.setState(
                {
                    player: currentPlayer,
                    isDisplayTable: false,
                    isDisplayForm: true,
                }
            );
        }
    }

    handleDelete(currentPlayer) {
        if (confirm("Вы действительно хотите удалить данную команду?")) {
            this.deletePlayer(currentPlayer);
        }
    }

    handleUpdate(currentPlayer) {
        this.setState(
            {
                player:currentPlayer,
                isDisplayForm: true,
                isDisplayTable: false,
                isUpdating: true
            }
        );
    }

    async deletePlayer(player) {
        console.log("Deleting");

        await fetch('player/delete', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(player.id)
        });

        this.getPlayers();
    }

    async getPlayers() {
        console.log("Receiving");

        const response = await fetch('player/get-all');

        const data = await response.json();

        this.setState({ players: data });
    }
}
