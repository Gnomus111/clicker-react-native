import { useEffect } from "react";
import { getCommon } from "../../api/controllers/Common-controller";
import React from "react";

useEffect(() => {
    getCommon()
        .then((response) => {
            console.log(response);
        })
        .catch((e) => console.log(e));
}, []);

const MainPage = () => {
    return <div style={{backgroundColor:"black"}}>Main Page</div>;

};

export default MainPage;