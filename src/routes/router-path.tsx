import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import { HomePage, LampPage, ThermoPage } from "../pages";
import { AppstoreOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import { NavBar } from "../common";

export const RouterComponent: React.FC = ()=>{
    return(
        <Router>
            <NavBar topics={[
                {content:"Home",icon:<HomeOutlined/>, path:'home'},
                {content:"Lamp",icon:<AppstoreOutlined/>, path: 'lamp'},
                {content:"Thermo",icon:<SettingOutlined/>, path: 'thermo'}
            ]}/>
            

            <Routes>
                <Route path="/home" element={<HomePage/>}>
                </Route>
                <Route path="/lamp" element={<LampPage/>}>
                </Route>
                <Route path="/thermo" element={<ThermoPage/>}>
                </Route>
            </Routes>
        </Router>
    );
}