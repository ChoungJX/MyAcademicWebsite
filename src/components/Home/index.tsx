import PropTypes from "prop-types";
import React from "react";
import AboutMe from "./components/AboutMe/about_me";
import BasicInfo from "./components/BasicInformation/basic_info";
import Education from "./components/Education/education";
import Experience from "./components/Experience/experience";
import Header from "../Header/header";
import StickyFooter from "../StickyFooter/StickyFooter";
import { Fab, Grid, Toolbar, Zoom, useScrollTrigger } from "@mui/material";
import { Container, CssBaseline } from "@mui/joy";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Publication from "./components/Publications/publication";

function ScrollTop(props: any) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 500,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetElement = event.target as Element;
    const anchor = (targetElement.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={(event) => {
          handleClick(event);
        }}
        role="presentation"
        style={{
          position: "fixed",
          bottom: "16px",
          right: "32px",
        }}
      >
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

export default function HomePageContent(props: any) {
  return (
    <>
      <Header
        Language={props.Language}
        Name={props.data ? props.data.HeaderTitle : ""}
        Notification={props.data ? props.data.Notification : ""}
        Github={props.data ? props.data.Github : ""}
        switchLanguage={props.switchLanguage}
      />
      <CssBaseline />
      <Toolbar id="back-to-top-anchor" />
      <Container sx={{ mt: "10px" }}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <BasicInfo
              Language={props.Language}
              Name={props.data ? props.data.Name : ""}
              Email={props.data ? props.data.Email : ""}
              Github={props.data ? props.data.Github : ""}
              Avatar={props.data ? props.data.Avatar : ""}
              UpdatedTime={props.data ? props.data.UpdatedTime : ""}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <AboutMe Language={props.Language} AboutMe={props.data?.AboutMe} />
            <br />
            <Education Language={props.Language} data={props.data?.Education} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Publication
              Language={props.Language}
              data={props.data?.Publications}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Experience
              Language={props.Language}
              data={props.data?.Experience}
            />
          </Grid>
        </Grid>
        <StickyFooter Language={props.Language} />
      </Container>
      <ScrollTop {...props}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{
            bgcolor: "#D3E4FC",
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
