import React, { useState, useEffect } from "react";
import "./chat.scss";
import { Grid } from "@material-ui/core";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";

export default function Chat() {
    const [preload, setPreload] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setPreload(true);
        }, 500);
        return () => {};
    }, []);

    return (
        <>
            <MetaTag
                title={"Tin nhắn"}
                description={"Kết nối với người mua, bán"}
            />
            {!preload ? (
                <Preloading />
            ) : (
                <Grid container className="chatContainer">
                    <Grid item className="chat-left" xs={4}>
                        left
                    </Grid>
                    <Grid item className="chat-right" xs={8}>
                        right
                    </Grid>
                </Grid>
            )}
        </>
    );
}
