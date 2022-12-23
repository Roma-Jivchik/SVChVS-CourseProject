import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isHidden: true,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand style={{ paddingLeft: 10 }} href="/">Football news</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Команды" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/Clubs">Просмотр всех команд</NavDropdown.Item>
                            <NavDropdown.Item href="/ClubsByLeague">Поиск команд по турниру</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Трансферный рынок" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/TransferLists">Просмотр трансферов</NavDropdown.Item>
                                <NavDropdown.Item href="/TransferListsByTeam">Поиск трансферов команды</NavDropdown.Item>
                            </NavDropdown>
                         <NavDropdown title="Матчи" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/Matches">Просмотр матчей</NavDropdown.Item>
                                <NavDropdown.Item href="/MatchesByTeamView">Поиск матчей по играющей в нем команде</NavDropdown.Item>
                            </NavDropdown>
                         <NavDropdown title="Игроки" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/Players">Просмотр игроков</NavDropdown.Item>
                                <NavDropdown.Item href="/PlayersByTeamView">Поиск игроков по команде</NavDropdown.Item>
                                <NavDropdown.Item href="/PlayersByPositionView">Поиск игроков по позиции</NavDropdown.Item>
                         </NavDropdown>
                    </Nav>
                    <Nav style=
                        {{
                        marginLeft: "auto",
                        paddingRight:40
                        }}>
                        <Nav.Link style={{ float: "right" }} href="/">На главную</Nav.Link>
                        <Nav.Link style={{ float: "right" }} href="/logout">Выйти</Nav.Link>
                        <Nav.Link style={{ float: "right" }} href="/">О нас</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
