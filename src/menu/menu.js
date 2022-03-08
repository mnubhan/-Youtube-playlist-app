import React from 'react';
import { Link } from 'react-router-dom';


class Menu extends React.Component {

    render() { 
        return (
        <div>
            <Link to="/home">Home</Link> &nbsp;
            <Link to="/youtube">Youtube</Link> &nbsp;
            <Link to="/help">Help</Link>
        </div>
        )
    }
}
 
export default Menu;