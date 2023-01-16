import logo from './logo.svg';
import {Routes, Route, BrowserRouter, Outlet, Link} from "react-router-dom";
import './App.css';
//import BasicRating from './components/test/Test'
//import StudentList from "./components/StudentList";
import ComponentList from "./components/ComponentList";
import FailmodeList from "./components/FailmodeList";
import MappingList from "./components/MappingList";
// import Charts from "./components/Charts";
import PersistentDrawerLeft from "./menu"

//import Menu from "./components/Menu"

function App() {
    return (
        <div className="App">
            <h1>Phase 1</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexPage/>}>
                        <Route path="/components" element={<ComponentList />} />
                        <Route path="/failmodes" element={<FailmodeList />} />
                        <Route path="/mappings" element={<MappingList />} />
                        {/*<Route path="/charts" element={<Charts />} />*/}
                    {/*<Route path="/ComponentList" element={<ComponentList/>}/>*/}
                    {/*<Route path="/FailmodeList" element={<FailmodeList/>}/>*/}
                    {/*<Route path="/MappingList" element={<MappingList/>}/>*/}

                    {/* Using path="*"" means "match anything", so this route
                    acts like a catch-all for URLs that we don't have explicit
                    routes for. */}
                    </Route>

                </Routes>
            </BrowserRouter>
        </div>
    );
}

function IndexPage() {
    return (
        <div>
            {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
            {/*<nav>*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            <Link to="/">Home</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/components">Components</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/failmodes">Fail Modes</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/mappings">Mappings</Link>*/}
            {/*        </li>*/}
            {/*        /!*<li>*!/*/}
            {/*        /!*  <Link to="/nothing-here">Nothing Here</Link>*!/*/}
            {/*        /!*</li>*!/*/}
            {/*    </ul>*/}
            {/*</nav>*/}


            <PersistentDrawerLeft/>

            <hr/>

            {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
            <Outlet/>
        </div>
    );
}

export default App;
