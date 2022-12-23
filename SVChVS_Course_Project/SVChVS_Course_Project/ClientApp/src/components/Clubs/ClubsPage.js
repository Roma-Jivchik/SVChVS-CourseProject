import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import { ClubForm} from './ClubForm';
import { ClubsTable} from './ClubsTable';

export class ClubsPage extends Component {
    static displayName = ClubsPage.name;

    constructor(props) {
        super(props);

        this.state = {
            clubs: [],
            club: {},
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

        this.getClubs = this.getClubs.bind(this);
        this.deleteClub = this.deleteClub.bind(this);
    }

    componentDidMount() {
        this.getClubs();
    }

    clearState() {
        this.setState(
            {
                club: {},
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
                <ClubsTable
                    handleChoose={this.handleChoose}
                    clubs={this.state.clubs}
                    isHidden={!this.state.isDisplayTable}
                    handleAdd={this.handleAdd}
                    handleDelete={this.handleDelete}
                    handleUpdate={ this.handleUpdate}
                />
                    :
                <ClubForm
                    club={ this.state.club}
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
                club: {},
                isDisplayTable: false,
                isDisplayForm: true,
                isAdding:true,
            }
        );
    }

    handleBack() {
        this.clearState();

        this.getClubs();
    }

    handleChoose(currentClub) {
        if (event.target.name != "btn-delete") {
            this.setState(
                {
                    club: currentClub,
                    isDisplayTable: false,
                    isDisplayForm: true,
                }
            );
        }
    }

    handleDelete(currentClub) {
        if (confirm("Вы действительно хотите удалить данную команду?")) {
            this.deleteClub(currentClub);
        }
    }

    handleUpdate(currentClub) {
        this.setState(
            {
                club:currentClub,
                isDisplayForm: true,
                isDisplayTable: false,
                isUpdating: true
            }
        );
    }

    async deleteClub(club) {
        console.log("Deleting");

        const response = await fetch('club/delete', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(club.id)
        });

        const responseData = await response.json();
        this.getClubs();
    }

    async getClubs() {
        console.log("Receiving");

        const response = await fetch('club/get-all');

        const data = await response.json();

        this.setState({ clubs: data });
    }
}
