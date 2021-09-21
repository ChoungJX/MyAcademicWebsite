import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TranslateIcon from '@material-ui/icons/Translate';
import { default as React } from 'react';



const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'block',
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
    notification: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function Header(props) {
    const classes = useStyles();


    const [languageEl, setLanguageEl] = React.useState(null);
    const [notificationEl, setNotificationEl] = React.useState(null);

    const [notificationsFlag, setnotificationsFlag] = React.useState("new");


    const isLanguageMenuOpen = Boolean(languageEl);
    const isNotificationElOpen = Boolean(notificationEl);


    const handleLanguageMenuOpen = (event) => {
        setLanguageEl(event.currentTarget);
    };

    const handleNotificationMenuOpen = (event) => {
        setnotificationsFlag(null)
        setNotificationEl(event.currentTarget);
    };

    const handleLanguageMenuSwitch = (language) => {
        props.switchLanguage(language);
        setLanguageEl(null);
    };

    const handleLanguageMenuClose = () => {
        setLanguageEl(null);
    };

    const handleNotificationMenuClose = () => {
        setNotificationEl(null);
    };

    const languageMenuId = 'primary-language-menu';
    const renderLanguageMenu = (
        <Menu
            anchorEl={languageEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={languageMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isLanguageMenuOpen}
            onClose={handleLanguageMenuClose}
        >
            <MenuItem onClick={() => handleLanguageMenuSwitch("english")}>English</MenuItem>
            <MenuItem onClick={() => handleLanguageMenuSwitch("chinese")}>简体中文</MenuItem>
            <MenuItem disabled>日本語（施工中。。。）</MenuItem>
        </Menu>
    );

    const NotificationMenuId = 'primary-search-account-menu-mobile';
    const renderNotificationMenu = (
        <Menu
            anchorEl={notificationEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={NotificationMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isNotificationElOpen}
            onClose={handleNotificationMenuClose}
        >
            {props.Notification.map((row, index) => (
                index === props.Notification.length - 1 ?
                    <div key={index}>
                        <MenuItem>
                            <ListItemText primary={row.news} secondary={row.date} />
                        </MenuItem>
                    </div>
                    :
                    <div key={index}>
                        <MenuItem>
                            <ListItemText primary={row.news} secondary={row.date} />
                        </MenuItem>
                        <Divider />
                    </div>
            ))}
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {(() => {
                            switch (props.Language) {
                                case "english":
                                    return props.Name
                                case "chinese":
                                    return `${props.Name}的主页`
                                default:
                                    return props.Name
                            }
                        })()}
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            aria-label="notification menu"
                            aria-controls={notificationEl}
                            aria-haspopup="true"
                            onClick={handleNotificationMenuOpen}
                            color="inherit"
                        >
                            <Badge badgeContent={notificationsFlag} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="language menu"
                            aria-controls={languageMenuId}
                            aria-haspopup="true"
                            onClick={handleLanguageMenuOpen}
                            color="inherit"
                        >
                            <TranslateIcon />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="notification menu"
                            aria-controls={notificationEl}
                            aria-haspopup="true"
                            onClick={handleNotificationMenuOpen}
                            color="inherit"
                        >
                            <Badge badgeContent={notificationsFlag} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="language menu"
                            aria-controls={languageMenuId}
                            aria-haspopup="true"
                            onClick={handleLanguageMenuOpen}
                            color="inherit"
                        >
                            <TranslateIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderNotificationMenu}
            {renderLanguageMenu}
        </div>
    );
}
