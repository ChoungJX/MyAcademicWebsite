import { Typography } from '@mui/joy';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

export default function BasicInfo(props: any) {

  return (
    <Card
      sx={{
        borderRadius: '12px',
      }}
    >
      <CardHeader
        title={
          <Typography
            fontSize='26px'
            fontWeight={600}
            sx={{
              color: '#454746'
            }}
          >
            {props.Name}
          </Typography>}
        subheader={`${props.Language?.BasicInfo?.update_time} ${props.UpdatedTime}`} />
      <CardMedia
        image={props.Avatar}
        title={props.Name}
        sx={{ minheight: "200px", width: 'auto', height: '320px' }}
      />
      <CardContent>
        <Typography component="p" sx={{ color: '#454746' }}>
          {props.Language?.BasicInfo?.message}
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
