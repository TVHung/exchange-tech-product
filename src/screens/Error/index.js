import React from "react";
import "./error.scss";
import pagenotfound from "../../assets/image/pagenotfound.jpg";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";

export default function Error() {
    return (
        <div className="container">
            <Grid container>
                <Grid item xs={12}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Button
                            style={{
                                fontWeight: "bold",
                                color: "white",
                                background:
                                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                                top: 50,
                                left: 50,
                            }}
                        >
                            Trở về home
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}
