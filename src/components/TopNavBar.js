import React from 'react';
import logo from '../assets/nba-logoman-word-white.svg';

export class TopNavBar extends React.Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1> Developed By: Yuanke Zhang</h1>

            </header>
        );
    }
}

// export function TopNavBar(props) {
//     return (
//         <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo" />
//         </header>
//     );
// }
