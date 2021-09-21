import { Card, CardContent, Divider, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    timeline: {
        float: "left",
        display: "inline",
        [theme.breakpoints.up('md')]: {
            float: "none",
        },
    },
    oppositeContent: {
        // TODO: adjust this value accordingly
        flex: 0.3,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    card: {
        maxWidth: theme.spacing(6),
    }
}));

export default function Experience(props) {
    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                    {(() => {
                        switch (props.Language) {
                            case "english":
                                return "Experience"
                            case "chinese":
                                return "项目经历"
                            default:
                                return "Experience"
                        }
                    })()}
                </Typography>
                <Divider />
                <Timeline className={classes.sectionDesktop} align="left">
                    {props.data.map((row, index) => (
                        index === props.data.length - 1 ?
                            <TimelineItem key={index}>
                                <TimelineOppositeContent
                                    className={classes.oppositeContent}
                                    color="textSecondary">

                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot color={row.color}>
                                        {row.icon}
                                    </TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                            {row.title}
                                        </Typography>
                                        <Typography variant="subtitle2">{row.location}</Typography>
                                        <Typography variant="subtitle2">{`${row.start_time} - ${row.end_time} · ${row.city}`}</Typography>
                                        <br />
                                        <Typography variant="body1">{row.content}</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            :
                            <TimelineItem key={index}>
                                <TimelineOppositeContent
                                    className={classes.oppositeContent}
                                    color="textSecondary">

                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot color={row.color}>
                                        {row.icon}
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                            {row.title}
                                        </Typography>
                                        <Typography variant="subtitle2">{row.location}</Typography>
                                        <Typography variant="subtitle2">{`${row.start_time} - ${row.end_time} · ${row.city}`}</Typography>
                                        <br />
                                        <Typography variant="body1">{row.content}</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                    ))}
                </Timeline>
                <br />
                <Grid container spacing={3} className={classes.sectionMobile}>
                    {props.data.map((row, index) => (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={index}>
                            <Paper elevation={3} className={classes.paper}>
                                {row.icon}
                                <Typography variant="h6" component="h1">
                                    {row.title}
                                </Typography>
                                <Typography variant="subtitle2">{row.location}</Typography>
                                <Typography variant="subtitle2">{`${row.start_time} - ${row.end_time} · ${row.city}`}</Typography>
                                <br />
                                <Typography variant="body1">{row.content}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}
