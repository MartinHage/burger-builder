import React from "react";
import classes from "./Layout.css" 

const layout = props => (
    <>
        <div>toolbar, sidedrawer, backdrop</div>
        <main className="Content">
            {props.children}
        </main>
    </>
);

export default layout;