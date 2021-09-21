import { Card, CardContent, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';



const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Education(props) {
    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h4">
                    {(() => {
                        switch (props.Language) {
                            case "english":
                                return "Education"
                            case "chinese":
                                return "教育背景"
                            default:
                                return "Education"
                        }
                    })()}
                </Typography>
                <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
                <List className={classes.list}>
                    {props.data.map((row, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                {row.icon}
                            </ListItemIcon>
                            <ListItemText primary={row.degree} secondary={row.school} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
