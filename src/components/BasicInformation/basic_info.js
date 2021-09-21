import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

export default function BasicInfo(props) {
    const classes = useStyles();

    return (
        <Card>
            {(() => {
                switch (props.Language) {
                    case "english":
                        return <CardHeader title={props.Name} subheader={`Updated on: ` + props.UpdatedTime} />
                    case "chinese":
                        return <CardHeader title={props.Name} subheader={`最后更新于: ` + props.UpdatedTime} />
                    default:
                        return <CardHeader title={props.Name} subheader={`Updated on: ` + props.UpdatedTime} />
                }
            })()}
            <CardMedia
                className={classes.media}
                image={props.Avatar}
                title={props.Name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {(() => {
                        switch (props.Language) {
                            case "english":
                                return "Feel free to contact me!"
                            case "chinese":
                                return "点击邮件按钮联系我"
                            default:
                                return "Feel free to contact me!"
                        }
                    })()}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <a href={`mailto:${props.Email}`}>
                    <IconButton aria-label="email">
                        <EmailIcon />
                    </IconButton>
                </a>
                <a href={props.Github} target="_blank">
                    <IconButton aria-label="github">
                        <GitHubIcon />
                    </IconButton>
                </a>
            </CardActions>
        </Card>
    );
}
