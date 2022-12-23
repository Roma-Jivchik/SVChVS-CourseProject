import React, { Component } from 'react';
import { PlayerFormView } from './PlayerFormView';

export class PlayerForm extends Component {
    static displayName = PlayerForm.name;

    constructor(props) {
        super(props);

        this.state = {
            player: this.props.player,
            formStateAdding: "Добавление",
            formStateUpdating: "Обновление",
            formStateExamine: "Просмотр",
        };

        this.handlePost = this.handlePost.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.postPlayer = this.postPlayer.bind(this);
        this.updatePlayer = this.updatePlayer.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    render() {
        return (
                <PlayerFormView
                player={this.state.player}
                isHidden={this.props.isHidden}
                isAdding={this.props.isAdding}
                isUpdating={this.props.isUpdating}
                handlePost={this.handlePost}
                handleBack={this.handleBack}
                />
        );
    }

    handlePost(event, player) {
        event.preventDefault();

        this.postPlayer(player);
    }

    handleUpdate(event, player) {
        event.preventDefault();

        this.updatePlayer(player);
    }

    async postPlayer(player) {
        console.log("Sending");

        await fetch('player/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(player)
        });
    }

    async updatePlayer(player) {
        console.log("Updating");

        await fetch('player/update', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(player)
        });
    }

    handleBack(event) {
        event.preventDefault();
        this.props.handleBack();
    }
}
