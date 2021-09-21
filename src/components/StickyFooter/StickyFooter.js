import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary">
      {(() => {
        switch (props.Language) {
          case "english":
            return "source code: "
          case "chinese":
            return "源代码："
          default:
            return "source code: "
        }
      })()}
      <Link color="inherit" href="https://github.com/ChoungJX/MyAcademicWebsite">
        <GitHubIcon />
      </Link>
    </Typography>
  );
}

export default function StickyFooter(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '10vh',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          {(() => {
            switch (props.Language) {
              case "english":
                return <Typography variant="body1">
                  This website is built by <a href="https://v4.mui.com/">Material UI</a> based on <a href="https://reactjs.org/">React.js</a>
                </Typography>
              case "chinese":
                return <Typography variant="body1">
                  本网站基于 <a href="https://v4.mui.com/">Material UI</a>和<a href="https://reactjs.org/">React.js</a>开发
                </Typography>
              default:
                return <Typography variant="body1">
                  This website is built by <a href="https://v4.mui.com/">Material UI</a> based on <a href="https://reactjs.org/">React.js</a>
                </Typography>
            }
          })()}

          <Copyright Language={props.Language} />
        </Container>
      </Box>
    </Box>
  );
}
