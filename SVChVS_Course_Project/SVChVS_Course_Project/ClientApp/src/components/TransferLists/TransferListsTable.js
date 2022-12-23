import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { TransferListsTableView } from './TransferListsTableView';

export class TransferListsTable extends Component {
    static displayName = TransferListsTable.name;

    constructor(props) {
        super(props);

        this.state = {
            transferList:{}
        }

        this.handleChoose = this.handleChoose.bind(this);
    }

    render() {
        return (
            <div hidden={this.props.isHidden}>
                <Button variant="light" style={{ marginBottom: 10,  marginTop:10 }} onClick={(event) => this.handleAdd(event)}>
                    Добавить
                </Button>
                <TransferListsTableView
                    transferLists={this.props.transferLists}
                    handleChoose={this.handleChoose}
                    handleExamine={this.props.handleExamine}
                    handleUpdate={this.props.handleUpdate}
                    handleDelete={this.props.handleDelete}
                />
            </div>
        );
    }

    handleChoose(transferList) {
        this.setState(
            {
                transferList: transferList
            }
        )

        this.props.handleChoose(transferList);
    }

    handleAdd(event) {
        event.preventDefault();
        this.props.handleAdd();
    }

    handleSort() {

    }
}
