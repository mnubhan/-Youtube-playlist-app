import React from 'react';
import axios from 'axios';
import Video from './video';

class Youtube extends React.Component {

    componentDidMount(){
        this.getvideoidlist()

    }

    constructor(props){
        super(props)
        this.state = {
            id:"",
            youtubeid:[],
            youtube:"",
            category:"",
            guideline:"add video id..",
            watchme:""
        }
    }

    

    getvideoidlist(){
        axios.get("http://localhost:1234/youtube")
        .then(response=>{
            console.log("Response: ")
            console.log(response)
            console.log(response.data)
            this.setState({
                youtubeid: response.data
            })
        })
        .catch(error=>{
            console.log("Error: ")
            console.log(error)
        })
    }
    


    captureyoutubeid=(event)=>{

        console.log(event.target.value)
        this.setState({
            youtube: event.target.value
        })
        if(event.target.value.length > 0){
            this.setState({buttonDisabled: false})
        }else{
            this.setState({buttonDisabled: true})
        }
    }

    capturecategory=(event)=>{
        console.log(event.target.value)
        this.setState({
            category: event.target.value
        })
    }

    savenewyoutubeid=()=>{
        let newyoutube= {
            "youtubeid": this.state.youtube,
            "category": this.state.category
           }
        console.log(newyoutube)   
        axios.post("http://localhost:1234/add/youtube", newyoutube)
                .then(response=>{
                    console.log(response)
                })
                .catch(error=>{
                    console.log(error)
                })

    }
    


    renderyoutubevideo=()=>{
        return this.state.youtubeid.map(youtube=>{
            return(
                <Video
                    key={youtube.id}
                    id={youtube.id}
                    youtubeid={youtube.youtubeid}
                    category={youtube.category}
                    playyoutube={this.playyoutubebyid}
                ></Video>
            )
        })
    }

    playyoutubebyid=(id)=>{
        console.log(id);
        this.setState({watchme:id})
    }

    




    render() { 
        return (
            <div>
                <div>
                    <fieldset>
                    <label>Youtube Id:</label>
                    <input type="text" onChange={this.captureyoutubeid} value={this.state.youtube}
                    ></input>
                    <br></br>

                    <label>Category:</label>
                    <select onChange={this.capturecategory} value={this.state.category} > 
                        <option value="sport">sport</option>
                        <option value="movie">movie</option>
                        <option value="food">food</option>
                        <option value="news">news</option>
                    </select>

                    <button onClick={this.savenewyoutubeid} >Add</button>

                    </fieldset>
                    <div>
                        YoutubeIdList
                        <div>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>YoutubeId</th>
                                        <th>Category</th>
                                        <th colSpan="1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderyoutubevideo()}
                                </tbody>

                            </table>
                        </div>
                        <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + this.state.watchme + "?erl=0"} frameborder="0">
                        </iframe>
                    
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Youtube;