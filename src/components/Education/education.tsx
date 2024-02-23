import { Typography } from '@mui/joy';
import { Card, CardContent, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';



export default function Education(props: any) {

  return (
    <Card
      sx={{
        borderRadius: '12px',
      }}
    >
      <CardContent>
        <Typography
          fontSize='26px'
          fontWeight='bold'
          sx={{
            color: '#454746'
          }}
        >
          {props.Language?.Education?.title}
        </Typography>
        <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
        <List>
          {props.data ? props.data.map((row: any, index: number) => (
            <ListItem key={index}>
              <ListItemIcon>
                {row.icon}
              </ListItemIcon>
              <ListItemText primary={row.degree} secondary={row.school} />
            </ListItem>
          )) : null}
        </List>
      </CardContent>
    </Card>
  );
}
