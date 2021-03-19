import React from 'react';
import { DataViewContainer } from './DataViewContainer';
//import nba from 'nba'
import { Profile } from './Profile';
import { SearchBar } from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants';

const nba = require("nba");
const getJSON = require("nba/src/get-json");



const transport = (url, params, options) => {
    // simply swap the host and then defer the rest to the built in getJSON function
    // local localhost:8010/proxy
    const fixedURL = url.replace("stats.nba.com", "stats.wnba.com");
    return getJSON(fixedURL, params, options);
};

const wnbaStats = nba.stats.withTransport(transport);


export class Main extends React.Component {

    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    }
    //commonPlayerInfo

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }

    // loadPlayerInfo = (playerName) => {
    //     wnbaStats.playerInfo({PlayerID: 201939})
    //         .then((value) => {
    //             console.log(value);
    //             // playerInfo = Object.assign(value.commonPlayerInfo[0], value.playerHeadlineStats[0]);
    //             //this.setState({playerInfo});
    //         })
    //         .catch(error => {
    //             console.log(error);
    //     });
    //  }
    // loadPlayerInfo = (playerName) => {
    //     //wnbaStats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId });
    //     (async () => {
    //         const result = await wnbaStats.playerInfo({ PlayerID: "1628886" });
    //         console.log(result.playerId);
    //     })();
    //     // console.log(result);
    //     // console.log(wnbaStats.playerInfo(nba.findPlayer(playerName).playerId).SeasonType)
    // }

    loadPlayerInfo = (playerName) => {
        wnbaStats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then(
            info => {
                const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                console.log(playerInfo);
                this.setState({ playerInfo });
            },
            error => {
                console.log("error" + error)
            }
        );
    }


    handleSelectPlayer = (playerName) => {
        console.log("handleSelectPlayer: " + playerName);
        this.loadPlayerInfo(playerName);
    }


    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}
