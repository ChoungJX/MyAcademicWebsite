import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import React from 'react';
import AboutMe from '../../components/AboutMe/about_me';
import BasicInfo from '../../components/BasicInformation/basic_info';
import Education from '../../components/Education/education';
import Experience from '../../components/Experience/experience';
import Header from '../../components/Header/header';
import StickyFooter from '../../components/StickyFooter/StickyFooter';


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 1000,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function HomePageContent(props) {

    return (
        <React.Fragment>
            <CssBaseline />
            <Header
                Language={props.data.content.Language}
                Name={props.data.content.Name}
                Notification={props.data.content.Notification}
                switchLanguage={props.switchLanguage} />
            <Toolbar id="back-to-top-anchor" />
            <Container>
                <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
                    <Grid item xs={12} />
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}>
                        <BasicInfo
                            Language={props.data.content.Language}
                            Name={props.data.content.Name}
                            Email={props.data.content.Email}
                            Github={props.data.content.Github}
                            Avatar={props.data.content.Avatar}
                            UpdatedTime={props.data.content.UpdatedTime} />
                    </Grid>
                    <Grid item
                        xs={12}
                        sm={12}
                        md={8}
                        lg={8}
                        xl={8}>
                        <AboutMe Language={props.data.content.Language} AboutMe={props.data.content.AboutMe} />
                        <br />
                        <Education Language={props.data.content.Language} data={props.data.content.Education} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Experience Language={props.data.content.Language} data={props.data.content.Experience} />
                    </Grid>
                </Grid>
                <StickyFooter Language={props.data.content.Language} />
            </Container>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}
