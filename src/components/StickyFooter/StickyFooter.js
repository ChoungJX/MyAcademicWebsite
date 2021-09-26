import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';

function Copyright(props) {
  return (
    <Button
      color="inherit"
      onClick={() => { window.open("https://github.com/ChoungJX/MyAcademicWebsite") }}
      endIcon={<GitHubIcon />}>
      {props.Language.Footer.button}
    </Button>
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
          {props.Language.Footer.content}
          <Copyright Language={props.Language} />
        </Container>
      </Box>
    </Box>
  );
}
