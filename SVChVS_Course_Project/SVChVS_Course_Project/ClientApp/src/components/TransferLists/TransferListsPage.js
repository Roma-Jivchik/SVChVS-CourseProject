import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import { TransferListForm} from './TransferListForm';
import { TransferListsTable} from './TransferListsTable';

export class TransferListsPage extends Component {
    static displayName = TransferListsPage.name;

    constructor(props) {
        super(props);

        this.state = {
            transferLists: [],
            transferList: {},
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

        this.getTransferLists = this.getTransferLists.bind(this);
        this.deleteTransferList = this.deleteTransferList.bind(this);
    }

    componentDidMount() {
        this.getTransferLists();
    }

    clearState() {
        this.setState(
            {
                transferList: {},
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
                <TransferListsTable
                    handleChoose={this.handleChoose}
                    transferLists={this.state.transferLists}
                    isHidden={!this.state.isDisplayTable}
                    handleAdd={this.handleAdd}
                    handleDelete={this.handleDelete}
                    handleUpdate={ this.handleUpdate}
                />
                    :
                <TransferListForm
                    transferList={ this.state.transferList}
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
                transferList: {},
                isDisplayTable: false,
                isDisplayForm: true,
                isAdding:true,
            }
        );
    }

    handleBack() {
        this.clearState();

        this.getTransferLists();
    }

    handleChoose(currentTransferList) {
        if (event.target.name != "btn-delete") {
            this.setState(
                {
                    transferList: currentTransferList,
                    isDisplayTable: false,
                    isDisplayForm: true,
                }
            );
        }
    }

    handleDelete(currentTransferList) {
        if (confirm("Вы действительно хотите удалить данную команду?")) {
            this.deleteTransferList(currentTransferList);
        }
    }

    handleUpdate(currentTransferList) {
        this.setState(
            {
                transferList:currentTransferList,
                isDisplayForm: true,
                isDisplayTable: false,
                isUpdating: true
            }
        );
    }

    async deleteTransferList(transferList) {
        console.log("Deleting");

        const response = await fetch('transferList/delete', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transferList.id)
        });

        const responseData = await response.json();
        this.getTransferLists();
    }

    async getTransferLists() {
        console.log("Receiving");

        const response = await fetch('transferList/get-all');

        const data = await response.json();

        this.setState({ transferLists: data });
    }
}
