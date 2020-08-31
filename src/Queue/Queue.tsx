import React, { useState, useEffect } from "react";
import firebase from "../firebase";

class Placard {
    name: string;

    reason: string;

    inquiry: string;

    timestamp: firebase.firestore.Timestamp;

    constructor(
        name: string,
        reason: string,
        inquiry: string,
        timestamp: firebase.firestore.Timestamp
    ) {
        this.name = name;
        this.reason = reason;
        this.inquiry = inquiry;
        this.timestamp = timestamp;
    }

    toString() {
        return `${this.name} - ${this.reason}: ${this.inquiry}`;
    }
}

const placardConverter = {
    toFirestore(placard: Placard): firebase.firestore.DocumentData {
        return {
            name: placard.name,
            reason: placard.reason,
            inquiry: placard.inquiry,
            timestamp: placard.timestamp,
        };
    },
    fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
    ): Placard {
        const data = snapshot.data(options);
        return new Placard(
            data.name,
            data.reason,
            data.inquiry,
            data.timestamp
        );
    },
};

const db = firebase.firestore();

function Queue(): JSX.Element {
    const [entryArray, setEntryArray] = useState<Placard[]>([]);

    useEffect(() => {
        db.collection("placards")
            .withConverter(placardConverter)
            .orderBy("timestamp", "asc")
            .onSnapshot(
                (doc) => {
                    const newArr: Placard[] = [];
                    doc.forEach((placard) => {
                        newArr.push(placard.data());
                    });
                    setEntryArray(newArr);
                },
                (err) => {
                    console.log(`Encountered error ${err}`);
                }
            );
    }, []);

    return (
        <div>
            <ul className="list-group">
                {entryArray.map((entry) => {
                    return (
                        <li className="list-group-item">{entry.toString()}</li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Queue;
