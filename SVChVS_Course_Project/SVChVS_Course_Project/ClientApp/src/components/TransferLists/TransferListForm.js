import React, { Component } from 'react';
import { TransferListFormView } from './TransferListFormView';

export class TransferListForm extends Component {
    static displayName = TransferListForm.name;

    constructor(props) {
        super(props);

        this.state = {
            transferList: this.props.transferList,
            formStateAdding: "Добавление",
            formStateUpdating: "Обновление",
            formStateExamine: "Просмотр",
        };

        this.handlePost = this.handlePost.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.postTransferList = this.postTransferList.bind(this);
        this.updateTransferList = this.updateTransferList.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    render() {
        return (
                <TransferListFormView
                transferList={this.state.transferList}
                isHidden={this.props.isHidden}
                isAdding={this.props.isAdding}
                isUpdating={this.props.isUpdating}
                handlePost={this.handlePost}
                handleBack={ this.handleBack}
                />
        );
    }

    handlePost(event, transferList) {
        event.preventDefault();

        this.postTransferList(transferList);
    }

    handleUpdate(event, transferList) {
        event.preventDefault();

        this.updateTransferList(transferList);
    }

    async postTransferList(transferList) {
        console.log("Sending");

        const response = await fetch('transferList/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transferList)
        });

        const responseData = await response.json();
    }

    async updateTransferList(transferList) {
        console.log("Updating");

        const response = await fetch('transferList/update', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transferList)
        });

        const responseData = await response.json();
    }

    handleBack(event) {
        event.preventDefault();
        this.props.handleBack();
    }
}
