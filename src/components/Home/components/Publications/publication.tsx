import { Stack, Typography } from "@mui/joy";
import { Card, CardContent, Divider } from "@mui/material";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";

export default function Publication(props: any) {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        minHeight: "200px",
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
          {props.Language?.Publication?.title}
        </Typography>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "200px",
          }}
        >
          <Typography
            fontSize="26px"
            fontWeight="bold"
            startDecorator={
              <AccessibleForwardIcon style={{ fontSize: "40px" }} />
            }
            sx={{
              color: "#454746",
            }}
          >
            COMING SOON!
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
