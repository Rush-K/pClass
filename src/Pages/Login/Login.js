import './Login.css';
import React from 'react';
import MainMenuBar from '/Users/rush-k/Desktop/pclass/src/img/Main_Menu_bar.png';
import DGUMark from '/Users/rush-k/Desktop/pclass/src/img/DGUMark.png';
import Username from '/Users/rush-k/Desktop/pclass/src/img/Username.png';
import Password from '/Users/rush-k/Desktop/pclass/src/img/Password.png';
import LoginButton from '/Users/rush-k/Desktop/pclass/src/img/LoginButton.png';
import RegisterButton from '/Users/rush-k/Desktop/pclass/src/img/RegisterButton.png';


function Login() {
    return (
        <view id='root'>
            <img width="100%" src={MainMenuBar}/>
            <view className="CenterAlign">
                <img width="30%" src={DGUMark}/>
            </view>
            <view className="CenterAlign">
                <img width="30%" src={Username}/>
            </view>
            <view className="CenterAlign">
                <img width="30%" src={Password}/>
            </view>
            <view className="CenterAlign">
                <img width="15%" src={LoginButton}/>
                <img width="15%" src={RegisterButton}/>
            </view>
        </view>
    );
}

function ClickButton(e) {
    
}

export default Login;