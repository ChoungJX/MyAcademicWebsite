import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function AboutMe(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h4">
                    {(() => {
                        switch (props.Language) {
                            case "english":
                                return "About Me"
                            case "chinese":
                                return "个人简介"
                            default:
                                return "About Me"
                        }
                    })()}
                </Typography>
                <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
                <Typography variant="body1" gutterBottom>
                    {props.AboutMe}
                </Typography>
            </CardContent>
        </Card>
    );
}
