import React from "react";
import MetaTags from "react-meta-tags";
import Logo from "../../assets/image/logopersonal2.png";

export default function MetaTag({ title, description }) {
    return (
        <MetaTags>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={Logo} />
        </MetaTags>
    );
}
