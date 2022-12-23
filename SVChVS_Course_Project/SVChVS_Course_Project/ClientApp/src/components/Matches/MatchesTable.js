import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { MatchesTableView } from './MatchesTableView';

export class MatchesTable extends Component {
    static displayName = MatchesTable.name;

    constructor(props) {
        super(props);

        this.state = {
            match:{}
        }

        this.handleChoose = this.handleChoose.bind(this);
    }

    render() {
        return (
            <div hidden={this.props.isHidden}>
                <Button variant="light" style={{ marginBottom: 10,  marginTop:10 }} onClick={(event) => this.handleAdd(event)}>
                    Добавить
                </Button>
                <MatchesTableView
                    matches={this.props.matches}
                    handleChoose={this.handleChoose}
                    handleExamine={this.props.handleExamine}
                    handleUpdate={this.props.handleUpdate}
                    handleDelete={this.props.handleDelete}
                />
            </div>
        );
    }

    handleChoose(match) {
        this.setState(
            {
                match: match
            }
        )

        this.props.handleChoose(match);
    }

    handleAdd(event) {
        event.preventDefault();
        this.props.handleAdd();
    }
}
