import React from 'react';

class Youtubeitem extends React.Component {
    render() { 
        return (
        <li>
            {this.props.item}
        </li>
        );
    }
}
 
export default Youtubeitem;