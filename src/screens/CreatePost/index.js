import React, { useState, useEffect } from "react";
import "./createPost.scss";
import { Grid } from "@material-ui/core";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";

export default function CreatePost() {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [preload, setPreload] = useState(false);
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    };

    useEffect(() => {
        setTimeout(() => {
            setPreload(true);
        }, 500);
        return () => {};
    }, []);

    return (
        <>
            <MetaTag
                title={"Tạo bài viết"}
                description={"Đăng bán, trao đổi, tắng sản phẩm"}
            />
            {!preload ? (
                <Preloading />
            ) : (
                <Grid container className="createPostContainer">
                    <Grid item xs={3} className="create-post-images">
                        <form>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => onSelectFile(e)}
                            />
                        </form>
                        {selectedFile && (
                            <img
                                src={preview}
                                alt="images"
                                width="100%"
                                height="200px"
                            />
                        )}
                    </Grid>
                    <Grid item xs={9} className="create-post-detail">
                        b
                    </Grid>
                </Grid>
            )}
        </>
    );
}
