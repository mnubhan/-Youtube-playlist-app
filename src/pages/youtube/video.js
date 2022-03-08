import React from 'react';

class Video extends React.Component {

    // gotoyoutubepage=()=>{
    //     console.log("Watch youtube");
    //     this.props.history.push('/viewyoutube')
    // }

    // constructor(props){
    //     super(props)
    //     this.state ={
    //         watchme:"",
    //     }
    // }

    // componentDidMount(){
    //     console.log(this.props)
    //     console.log(this.props.match.params.id);
    //     axios.get("http://localhost:1234/all/youtube/" + this.state.id)
    //          .then(response=>{
    //              console.log(response);
    //              this.setState({
    //                  youtubeid: response.data[0].youtubeid,
    //                  category: response.data[0].category,
    //                  viewyoutube: "https://www.youtube.com/watch?v=" + response.data[0].youtubeid
    //              })
    //              console.log(this.state);
    //          })
    //          .catch(err=>{
    //              console.log(err);
    //          })
    // }


    // componentDidMount(){
    //     axios.get("http://localhost:1234/youtube/id/" + this.props.id)
    //          .then(response=>{
    //              console.log(response)
    //              this.setState({
    //                  watchme: "https://www.youtube.com/watch?v=" + response.data[0].youtubeid
    //              })
    //              console.log(this.state)
    //          })
    //          .catch(error=>{
    //              console.log(error)
    //          })
    // }

    watchyoutube=()=>{
        this.props.playyoutube(this.props.youtubeid)
    }


    render() { 
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.youtubeid}</td>
                <td>{this.props.category}</td>
                <td>
                    <button onClick={this.watchyoutube}>View</button>
                </td>
            </tr>
            );
    }
}
 
export default Video;