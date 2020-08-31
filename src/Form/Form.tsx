import React, { useState } from "react";
import firebase from "../firebase";

const db = firebase.firestore();

function Form(): JSX.Element {
    const [reason, setReason] = useState("Point of Order");
    const [inquiry, setInquiry] = useState("Unknown inquiry");
    const [name, setName] = useState("Unknown name");
    const [isRaised, setIsRaised] = useState(false);
    const [id, setId] = useState("");

    const handleReason = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setReason(event.target.value);
    };

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleInquiry = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInquiry(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsRaised(true);
        db.collection("placards")
            .add({
                name,
                reason,
                inquiry,
                timestamp: firebase.firestore.Timestamp.now(),
            })
            .then((docRef) => {
                console.log(docRef.id);
                setId(docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        return false;
    };

    const deleteEntry = () => {
        if (id !== "") {
            setIsRaised(false);
            db.collection("placards")
                .doc(id)
                .delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group row">
                <p className="col col-form-label">Name:</p>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Sam Chaturvedi"
                        onChange={handleName}
                    />
                </div>
            </div>
            <div className="form-group row">
                <p className="col col-form-label">Reason:</p>
                <div className="col">
                    <select
                        className="form-control"
                        value={reason}
                        onChange={handleReason}
                    >
                        <option>Point of Order</option>
                        <option>Point of Information</option>
                        <option>Point of Parliamentary Inquiry</option>
                        <option>Point of Personal Privilege</option>
                        <option>Objection</option>
                        <option>Motion to Nominate</option>
                        <option>Motion to Extend or Limit Debate</option>
                        <option>Motion for Straw Poll</option>
                        <option>
                            Previous Question (Motion to Close Debate)
                        </option>
                        <option>Motion to Adopt by Unanimous Consent</option>
                        <option>Speak (Other)</option>
                        <option>Motion (Specify)</option>
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <p className="col col-form-label">Inquiry:</p>
                <div className="col">
                    <textarea
                        onChange={handleInquiry}
                        className="form-control"
                        placeholder="Comments?"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button
                        disabled={isRaised}
                        className="btn btn-lg btn-primary"
                        type="submit"
                    >
                        Raise Placard
                    </button>
                </div>
                <div className="col">
                    <button
                        type="button"
                        onClick={deleteEntry}
                        disabled={!isRaised}
                        className="btn btn-lg btn-primary"
                    >
                        Lower Placard
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Form;
