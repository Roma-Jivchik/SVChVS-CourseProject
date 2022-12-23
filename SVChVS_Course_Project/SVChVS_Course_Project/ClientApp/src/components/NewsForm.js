import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './NavMenu.css';

export class NewsForm extends Component {
    static displayName = NewsForm.name;

    constructor(props) {
        super(props)

    };

    render() {
        return (
            <div>
                <Row className = "row">
                    <Col>
                <Card border="dark" style={{ width: '20rem'}}>
                    <Card.Img variant="top" src="images/Ronaldo.jpg" />
                    <Card.Body>
                        <Card.Title>Нашумевший уход Роналду</Card.Title>
                        <Card.Text className="card">
                            Роналду разорвал контракт с Манчестер Юнайтед.Куда он пойдет дальше?Уедет ли за деньгами или еще попытает счастья в Европе?
                        </Card.Text>
                    </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                <Card border="dark" style={{ width: '20rem'}}>
                    <Card.Img variant="top" src="images/Final.jpg" />
                    <Card.Body>
                        <Card.Title>Финал чемпионата мира</Card.Title>
                        <Card.Text className="card-ronaldo">
                            18.12 18:00 состоится финал чемпионата мира.Сможет ли Месси заполучить трофей или французы возьмут его во второй раз?
                        </Card.Text>
                    </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                <Card border="dark" style={{ width: '20rem'}}>
                    <Card.Img variant="top" src="images/Messi.jpg" />
                    <Card.Body>
                        <Card.Title>Месси обьявлен лучшим игроком чемпионата мира</Card.Title>
                        <Card.Text className="card-ronaldo">
                            Месси стал лучшим игроком прошедшего ЧМ в Катаре.На его счету 7 голов и 5 ассистов, так же естественно сама победа на ЧМ.
                        </Card.Text>
                    </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="row">
                    <Col>
                    <Card border="dark" style={{ width: '20rem'}}>
                        <Card.Img variant="top" src="images/Mbappe.jpg" />
                        <Card.Body>
                            <Card.Title>Заслуживает ли Мбаппе золотой мяч?<br />Была ли победа Аргентины купленной?</Card.Title>
                            <Card.Text className="card-ronaldo">
                                Мбаппе сделал столько же результативных действий сколько и Месси, и так же сыграл сезон лучше.Посмотрят ли на это France Football или опять отдадут спорный золотой мяч Месси?
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="dark" style={{ width: '20rem' }}>
                            <Card.Img variant="top" src="images/WC.jpg" />
                            <Card.Body>
                                <Card.Title>Чемпионат мира в Катаре закончен.<br/>Победитель - Аргентина.</Card.Title>
                                <Card.Text className="card-ronaldo">
                                    Лучший игрок - Месси, лучший бомбардир - Мбаппе, лучший ассистент - Перишич, лучший вратарь - Орио.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="dark" style={{ width: '20rem' }}>
                            <Card.Img variant="top" src="images/Era.jpg" />
                            <Card.Body>
                                <Card.Title>Закончена ли эра игроков нашего поколения?</Card.Title>
                                <Card.Text className="card-ronaldo">
                                   Суарез, Неймар, Роналду и другие игроки которым уже за 30 лет,увидим ли мы их еще в таких громкиих турнирах с своей лучшей форме?
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}