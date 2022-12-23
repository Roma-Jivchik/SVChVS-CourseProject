import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { NewsForm } from './NewsForm';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu />
                {/*<NewsForm/>*/}
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
