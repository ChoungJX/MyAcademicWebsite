import { Chip, Typography } from "@mui/joy";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function Publication(props: any) {
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
          {props.Language?.Publication?.title}
        </Typography>
        <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
        <List>
          {props.data
            ? props.data.map((row: any, index: number) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemIcon>{row.icon}</ListItemIcon>
                  <ListItemText
                    primary={row.title}
                    primaryTypographyProps={{ fontWeight: 600 }}
                    secondary={
                      <>
                        {row.authors}
                        <br />
                        <i>{row.venue}</i>, {row.year}
                        {row.status ? (
                          <Chip
                            size="sm"
                            sx={{ bgcolor: "#C2E7FF", ml: "8px" }}
                          >
                            {row.status}
                          </Chip>
                        ) : null}
                      </>
                    }
                    secondaryTypographyProps={{ component: "div" }}
                  />
                </ListItem>
              ))
            : null}
        </List>
      </CardContent>
    </Card>
  );
}
