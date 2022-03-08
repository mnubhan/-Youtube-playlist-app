import ReactDom from "react-dom"
import { HashRouter } from "react-router-dom"
import SPARootcomponent from "./rootcomponent/root"


let location = document.getElementById("root")

ReactDom.render(
        <HashRouter>
            <SPARootcomponent></SPARootcomponent>
        </HashRouter>
            , location)
