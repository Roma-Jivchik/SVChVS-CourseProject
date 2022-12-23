import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

export class ClubsTableView extends Component {
    static displayName = ClubsTableView.name;

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
                    <tr className = "head">
                        <th>№</th>
                        <th>Название</th>
                        <th>Место в таблице</th>
                        <th>Название стадиона</th>
                        <th>Турнир</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.clubs.map((club, id) =>
                        <tr key={club.id} onClick={() => { this.props.handleChoose(club) }}>
                            <td>{id + 1}</td>
                            <td>{club.name}</td>
                            <td>{club.place}</td>
                            <td>{club.stadium}</td>
                            <td>{club.league}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}
