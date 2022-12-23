import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

export class MatchesTableView extends Component {
    static displayName = MatchesTableView.name;

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
                        <th>Хозяева</th>
                        <th>Гости</th>
                        <th>Результат</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.matches.map((match, id) =>
                        <tr key={match.id} onClick={() => { this.props.handleChoose(match) }}>
                            <td>{id + 1}</td>
                            <td>{match.firstTeamPlayed}</td>
                            <td>{match.secondTeamPlayed}</td>
                            <td>{match.result}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}
