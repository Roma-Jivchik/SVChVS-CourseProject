import React, { Component } from 'react';
import { MatchFormView } from './MatchFormView';

export class MatchForm extends Component {
    static displayName = MatchForm.name;

    constructor(props) {
        super(props);

        this.state = {
            match: this.props.match,
            formStateAdding: "Добавление",
            formStateUpdating: "Обновление",
            formStateExamine: "Просмотр",
        };

        this.handlePost = this.handlePost.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.postMatch = this.postMatch.bind(this);
        this.updateMatch = this.updateMatch.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    render() {
        return (
                <MatchFormView
                match={this.state.match}
                isHidden={this.props.isHidden}
                isAdding={this.props.isAdding}
                isUpdating={this.props.isUpdating}
                handlePost={this.handlePost}
                handleBack={ this.handleBack}
                />
        );
    }

    handlePost(event, match) {
        event.preventDefault();

        this.postMatch(match);
    }

    handleUpdate(event, match) {
        event.preventDefault();

        this.updateMatch(match);
    }

    async postMatch(match) {
        console.log("Sending");

        await fetch('match/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(match)
        });
    }

    async updateMatch(match) {
        console.log("Updating");

        await fetch('match/update', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(match)
        });
    }

    handleBack(event) {
        event.preventDefault();
        this.props.handleBack();
    }
}
