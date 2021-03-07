import {
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import firebase from "../firebase";

const db = firebase.firestore();

function Form(): JSX.Element {
    const [reason, setReason] = useState("Point of Order");
    const [inquiry, setInquiry] = useState("Unknown inquiry");
    const [name, setName] = useState("Unknown name");
    const [isRaised, setIsRaised] = useState(false);
    const [id, setId] = useState("");

    const handleReason = (
        event: React.ChangeEvent<{
            value: unknown;
        }>
    ) => {
        setReason(event.target.value as string);
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
                setId(docRef.id);
            });
        return false;
    };

    const deleteEntry = () => {
        if (id !== "") {
            setIsRaised(false);
            db.collection("placards").doc(id).delete();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Paper style={{ padding: "18px" }}>
                <Grid container spacing={3}>
                    <Grid container item spacing={3} alignItems="center">
                        <Grid xs={6} item>
                            <InputLabel>Name:</InputLabel>
                        </Grid>
                        <Grid xs={6} item>
                            <TextField
                                fullWidth
                                placeholder="Sam Chaturvedi"
                                onChange={handleName}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={3} alignItems="center">
                        <Grid xs={6} item>
                            <InputLabel>Reason:</InputLabel>
                        </Grid>
                        <Grid item xs={6}>
                            <Select
                                fullWidth
                                value={reason}
                                onChange={handleReason}
                            >
                                <MenuItem value="Point of Order">
                                    Point of Order
                                </MenuItem>
                                <MenuItem value="Point of Information">
                                    Point of Information
                                </MenuItem>
                                <MenuItem value="Point of Parliamentary Inquity">
                                    Point of Parliamentary Inquiry
                                </MenuItem>
                                <MenuItem value="Point of Personal Privilege">
                                    Point of Personal Privilege
                                </MenuItem>
                                <MenuItem value="Objection">Objection</MenuItem>
                                <MenuItem value="Motion to Nominate">
                                    Motion to Nominate
                                </MenuItem>
                                <MenuItem value="Motion to Extend or Limit Debate">
                                    Motion to Extend or Limit Debate
                                </MenuItem>
                                <MenuItem value="Motion for Straw Poll">
                                    Motion for Straw Poll
                                </MenuItem>
                                <MenuItem value="Previous Question (Motion to Close Debate)">
                                    Previous Question (Motion to Close Debate)
                                </MenuItem>
                                <MenuItem value="Motion to Adopt by Unanimous Consent">
                                    Motion to Adopt by Unanimous Consent
                                </MenuItem>
                                <MenuItem value="Speak (Other)">
                                    Speak (Other)
                                </MenuItem>
                                <MenuItem value="Motion (Specify)">
                                    Motion (Specify)
                                </MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={3} alignItems="center">
                        <Grid xs={6} item>
                            <InputLabel>Inquiry:</InputLabel>
                        </Grid>
                        <Grid xs={6} item>
                            <TextField
                                fullWidth
                                multiline
                                onChange={handleInquiry}
                                placeholder="Comments?"
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={3} alignItems="center">
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isRaised}
                                type="submit"
                            >
                                Raise Placard
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={deleteEntry}
                                disabled={!isRaised}
                            >
                                Lower Placard
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
}

export default Form;
