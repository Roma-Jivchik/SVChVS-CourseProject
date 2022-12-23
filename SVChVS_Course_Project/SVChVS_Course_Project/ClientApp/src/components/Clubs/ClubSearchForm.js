import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

export class ClubSearchForm extends Component {
    static displayName = ClubSearchForm.name;

    constructor(props) {
        super(props);

        this.state = {
            clubs: [],
            isSearching: false,
            id:0
        }

        this.getClubsByLeague = this.getClubsByLeague.bind(this);
    }

    render() {
        return (
            <div>
            <fieldset hidden = {this.state.isSearching}>
                    <Card style={{ width: '20rem', marginLeft:100, marginTop:10 }}>
                        <Card.Img variant="top" src="images/La Liga.jpg" />
                        <Card.Body>
                            <Card.Title>La Liga</Card.Title>
                            <Card.Text>
                                Чемпионат Испании
                            </Card.Text>
                            <Button variant="light" onClick={() => this.getClubsByLeague("La Liga")}>
                                Поиск
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '20rem', marginLeft: 800, marginTop: -380 }}>
                        <Card.Img variant="top" src="images/Serie A.jpg" />
                        <Card.Body>
                            <Card.Title>Serie A</Card.Title>
                            <Card.Text>
                                Чемпионат Италии
                            </Card.Text>
                            <Button variant="light" onClick={() => this.getClubsByLeague("Serie A")}>
                                Поиск
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '20rem', marginLeft: 100, marginTop: 100 }}>
                        <Card.Img variant="top" src="images/BundesLiga.jpg" />
                        <Card.Body>
                            <Card.Title>BundesLiga</Card.Title>
                            <Card.Text>
                                Чемпионат Германии
                            </Card.Text>
                            <Button variant="light" onClick={() => this.getClubsByLeague("BundesLiga")}>
                                Поиск
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '20rem', marginLeft: 800, marginTop: -480 }}>
                        <Card.Img variant="top" src="images/BPL.jpg" />
                        <Card.Body>
                            <Card.Title>Barclays Premier League</Card.Title>
                            <Card.Text>
                                Чемпионат Англии
                            </Card.Text>
                            <Button variant="light" onClick={() => this.getClubsByLeague("BPL")}>
                                Поиск
                            </Button>
                        </Card.Body>
                    </Card>
            </fieldset>
                <fieldset hidden={!this.state.isSearching}>
                    <Button variant="light" style={{ marginBottom: 10, marginTop: 10 }}
                        onClick={() => this.handleBack()}>
                        Назад к поиску
                    </Button>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Название</th>
                                <th>Место в таблице</th>
                                <th>Название стадиона</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.clubs.map((club, id) =>
                                <tr key={club.id}>
                                    <td>{id + 1}</td>
                                    <td>{club.name}</td>
                                    <td>{club.place}</td>
                                    <td>{club.stadium}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </fieldset>
            </div>
        );
    }

    async getClubsByLeague(league) {
        console.log("Getting");

        const response = await fetch('club/get-by-league', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(league)
        });

        const responseData = await response.json();

        this.setState({ clubs: responseData })
        this.setState({ isSearching: !this.state.isSearching })
    }

    handleBack() {
        this.setState({ isSearching: !this.state.isSearching })
    }
}