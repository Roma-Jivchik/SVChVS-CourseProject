import React, { Component } from 'react';
import { ClubFormView } from './ClubFormView';

export class ClubForm extends Component {
    static displayName = ClubForm.name;

    constructor(props) {
        super(props);

        this.state = {
            club: this.props.club,
            formStateAdding: "Добавление",
            formStateUpdating: "Обновление",
            formStateExamine: "Просмотр",
        };

        this.handlePost = this.handlePost.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.postClub = this.postClub.bind(this);
        this.updateClub = this.updateClub.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    render() {
        return (
                <ClubFormView
                club={this.state.club}
                isHidden={this.props.isHidden}
                isAdding={this.props.isAdding}
                isUpdating={this.props.isUpdating}
                handlePost={this.handlePost}
                handleBack={ this.handleBack}
                />
        );
    }

    handlePost(event, club) {
        event.preventDefault();

        this.postClub(club);
    }

    handleUpdate(event, club) {
        event.preventDefault();

        this.updateClub(club);
    }

    async postClub(club) {
        console.log("Sending");

        const response = await fetch('club/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(club)
        });

        const responseData = await response.json();
    }

    async updateClub(club) {
        console.log("Updating");

        const response = await fetch('club/update', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(club)
        });

        const responseData = await response.json();
    }

    handleBack(event) {
        event.preventDefault();
        this.props.handleBack();
    }
}
