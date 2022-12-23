import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClubSearchForm } from './components/Clubs/ClubSearchForm';
import { ClubsPage } from './components/Clubs/ClubsPage';
import { Layout } from './components/Layout';
import { MatchesByTeamView } from './components/Matches/MatchesByTeamView';
import { MatchesPage } from './components/Matches/MatchesPage';
import { NewsForm } from './components/NewsForm';
import { PlayersByPositionView } from './components/Players/PlayersByPositionView';
import { PlayersByTeamView } from './components/Players/PlayersByTeamView';
import { PlayersPage } from './components/Players/PlayersPage';
import { TransferListsPage } from './components/TransferLists/TransferListsPage';
import { TransfersByTeamView } from './components/TransferLists/TransfersByTeamView';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Router>
                    <Routes>
                        <Route path='/ClubsByLeague' element={<ClubSearchForm />} />
                        <Route path='/Clubs' element={<ClubsPage />} />
                        <Route path='/TransferLists' element={<TransferListsPage />} />
                        <Route path='/TransferListsByTeam' element={<TransfersByTeamView />} />
                        <Route path='/Matches' element={<MatchesPage />} />
                        <Route path='/MatchesByTeamView' element={<MatchesByTeamView />} />
                        <Route path='/Players' element={<PlayersPage />} />
                        <Route path='/PlayersByTeamView' element={<PlayersByTeamView />} />
                        <Route path='/PlayersByPositionView' element={<PlayersByPositionView />} />
                        <Route path='/' element={<NewsForm />} />
                    </Routes>
                </Router>
            </Layout>
        );
    }
}