import React, { useState, useEffect } from "react";
import "./profile.scss";
import Preloading from "../../components/Loading";

export default function Detail() {
    const [preload, setPreload] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setPreload(true);
        }, 500);
        return () => {};
    }, []);

    return (
        <div className="profile-container">
            {!preload ? <Preloading /> : <div>Hello</div>}
        </div>
    );
}
