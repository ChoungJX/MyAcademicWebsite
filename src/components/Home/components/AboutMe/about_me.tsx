import { Typography } from "@mui/joy";
import { Card, CardContent, Divider } from "@mui/material";
import React from "react";

export default function AboutMe(props: any) {
  return (
    <Card
      sx={{
        borderRadius: "12px",
      }}
    >
      <CardContent>
        <Typography
          fontSize="26px"
          fontWeight="bold"
          sx={{
            color: "#454746",
          }}
        >
          {props.Language?.AboutMe?.title}
        </Typography>
        <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
        <Typography
          component="div"
          gutterBottom
          sx={{
            color: "#454746",
          }}
        >
          {props.AboutMe}
        </Typography>
      </CardContent>
    </Card>
  );
}
