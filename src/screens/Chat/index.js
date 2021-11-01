import React from "react";
import "./chat.scss";
import { Grid } from "@material-ui/core";

export default function Chat() {
    return (
        <Grid container className="chatContainer">
            <Grid item className="chat-left" xs={4}>
                left
            </Grid>
            <Grid item className="chat-right" xs={8}>
                right
            </Grid>
        </Grid>
    );
}
