import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    container: {
        // backgroundImage: `url(${background})`,
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
        // backgroundSize: "cover",
        // backgroundAttachment: "fixed",
        paddingTop: 50,
    },

    logo: {
        width: 100,
        height: 100,
    },

    paper: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 0px 8px 0px rgba(0, 0, 0, .2)",
        borderRadius: 5,
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    avatar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        marginTop: theme.spacing(1),
        width: 330,
        margin: 40,
    },

    input: {
        // height: 40,
    },

    submit: {
        margin: theme.spacing(2, 0, 2),
        height: 45,
        fontSize: 16,
        fontFamily: "inherit",
        fontWeight: "bold",
        textTransform: "capitalize",
    },

    nofi: {
        color: "red",
        padding: 0,
        margin: 0,
    },

    text: {
        color: "blue",
        marginRight: 20,
        textDecoration: "underline",
        "&:hover": {
            cursor: "pointer",
        },
    },
}));
