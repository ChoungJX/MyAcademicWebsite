import { Stack, Typography } from '@mui/joy';
import { Box, Button, Container, CssBaseline } from '@mui/material';
import React from 'react';


export default function StickyFooter(props: any) {
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      width='100%'
      sx={{
        minHeight: '10vh',
      }}
    >
      <Typography
        fontSize='16px'
      >
        {props.Language?.Footer?.content}
      </Typography>
    </Stack>
  );
}
