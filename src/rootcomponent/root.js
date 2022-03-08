import React from "react";
import Content from '../content/content';
import Menu from "../menu/menu";

class SPARootComponent extends React.Component{
    render(){
        return (
            <div>
            
                <div>
                <Menu></Menu>
                </div>

                <div>
                <Content></Content>
                </div>
                
            </div>
        );
    }
}

export default SPARootComponent