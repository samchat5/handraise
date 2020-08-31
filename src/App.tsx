import React from "react";
import Form from "./Form/Form";
import Queue from "./Queue/Queue";

function App(): JSX.Element {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Form />
                </div>
                <div className="col">
                    <Queue />
                </div>
            </div>
        </div>
    );
}

export default App;
