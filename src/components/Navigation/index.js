import React from 'react'
import useStyles from './styles';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

export default function Navigation() {
    const classes = useStyles();
    return (
        <nav className={classes.container}>
            <Grid container className={classes.gridContainer}>
                <Grid item xs={2}>
                    <Link to='/' className={classes.linkStyle}>
                        <h3>Logo</h3>
                    </Link>
                </Grid>
                <Grid item xs={10}>
                    <ul className={classes.ul}>
                        <li className={classes.li}>
                            <Link to='/' className={classes.linkStyle}>
                                Home
                            </Link>
                        </li>
                        <li className={classes.li}>
                            <Link to='/service' className={classes.linkStyle}>
                                Service
                            </Link>
                        </li>
                        <li className={classes.li}>
                            <Link to='/about' className={classes.linkStyle}>
                                About
                            </Link>
                        </li>
                        <li className={classes.li}>
                            <Link to='/login' className={classes.linkStyle}>
                                Login
                            </Link>
                        </li>
                        <li className={classes.li}>
                            <Link to='/register' className={classes.linkStyle}>
                                Sign in
                            </Link>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        </nav>
    )
}
