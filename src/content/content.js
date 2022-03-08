import React from 'react';
import { Switch, Route,  } from 'react-router-dom';
import Help from '../pages/help';
import Home from '../pages/home';
import Youtube from '../pages/youtube/youtube';

class Content extends React.Component {
    render() { 
        return (
        <div>
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/youtube" component={Youtube}></Route>
                <Route path="/help" component={Help}></Route>
            </Switch>
        </div>
        )
    }
}
 
export default Content;