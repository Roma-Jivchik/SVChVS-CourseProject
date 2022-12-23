import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

export class PlayersTableView extends Component {
    static displayName = PlayersTableView.name;

    constructor(props) {
        super(props);

        this.state = {
            id:0
        }
    }

    render() {
        return (
            <Table striped bordered hover variant="dark" hidden={this.props.isHidden}>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Команда</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.players.map((player, id) =>
                        <tr key={player.id} onClick={() => { this.props.handleChoose(player) }}>
                            <td>{id + 1}</td>
                            <td>{player.firstName}</td>
                            <td>{player.lastName}</td>
                            <td>{player.team}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}
