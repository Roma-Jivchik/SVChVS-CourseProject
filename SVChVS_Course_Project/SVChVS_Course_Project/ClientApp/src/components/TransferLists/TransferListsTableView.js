import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

export class TransferListsTableView extends Component {
    static displayName = TransferListsTableView.name;

    constructor(props) {
        super(props);

        this.state = {
            id:0
        }
    }

    render() {
        return (

            <Table variant="dark" striped bordered hover hidden={this.props.isHidden}>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Игрок</th>
                        <th>Откуда</th>
                        <th>Куда</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.transferLists.map((transferList, id) =>
                        <tr key={transferList.id} onClick={() => { this.props.handleChoose(transferList) }}>
                            <td>{id + 1}</td>
                            <td>{transferList.playerName}</td>
                            <td>{transferList.fromTeam}</td>
                            <td>{transferList.toTeam}</td>
                            <td>{transferList.price}$</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}
