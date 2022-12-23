import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import { MatchForm} from './MatchForm';
import { MatchesTable} from './MatchesTable';

export class MatchesPage extends Component {
    static displayName = MatchesPage.name;

    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            match: {},
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

        this.getMatches = this.getMatches.bind(this);
        this.deleteMatch = this.deleteMatch.bind(this);
    }

    componentDidMount() {
        this.getMatches();
    }

    clearState() {
        this.setState(
            {
                match: {},
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
                <MatchesTable
                    handleChoose={this.handleChoose}
                    matches={this.state.matches}
                    isHidden={!this.state.isDisplayTable}
                    handleAdd={this.handleAdd}
                    handleDelete={this.handleDelete}
                    handleUpdate={ this.handleUpdate}
                />
                    :
                <MatchForm
                    match={ this.state.match}
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
                match: {},
                isDisplayTable: false,
                isDisplayForm: true,
                isAdding:true,
            }
        );
    }

    handleBack() {
        this.clearState();

        this.getMatches();
    }

    handleChoose(currentMatch) {
        if (event.target.name != "btn-delete") {
            this.setState(
                {
                    match: currentMatch,
                    isDisplayTable: false,
                    isDisplayForm: true,
                }
            );
        }
    }

    handleDelete(currentMatch) {
        if (confirm("Вы действительно хотите удалить данную команду?")) {
            this.deleteMatch(currentMatch);
        }
    }

    handleUpdate(currentMatch) {
        this.setState(
            {
                match:currentMatch,
                isDisplayForm: true,
                isDisplayTable: false,
                isUpdating: true
            }
        );
    }

    async deleteMatch(match) {
        console.log("Deleting");

        await fetch('match/delete', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(match.id)
        });

        this.getMatches();
    }

    async getMatches() {
        console.log("Receiving");

        const response = await fetch('match/get-all');

        const data = await response.json();

        this.setState({ matches: data });
    }
}
