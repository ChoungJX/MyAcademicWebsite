import { Chip, Typography } from "@mui/joy";
import { Card, CardContent, Divider, Paper } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import PlaceTwoToneIcon from "@mui/icons-material/PlaceTwoTone";
import "./experience.css";

export default function Experience(props: any) {
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
          {props.Language?.Experience?.title}
        </Typography>
        <Divider />
        <div className="experience-full">
          <Timeline>
            {props.data
              ? props.data.map((row: any, index: number) =>
                  index === props.data.length - 1 ? (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent>
                        <div>
                          <Chip
                            endDecorator={<CalendarMonthTwoToneIcon />}
                            sx={{
                              bgcolor: "#F2F6FC",
                            }}
                          >
                            {`${row.start_time} - ${row.end_time}`}
                          </Chip>
                          <br />
                          <Chip
                            endDecorator={<PlaceTwoToneIcon />}
                            sx={{
                              bgcolor: "#F2F6FC",
                              mt: "10px",
                            }}
                          >
                            {row.city}
                          </Chip>
                        </div>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: "#D3E3FD" }}>
                          {row.icon}
                        </TimelineDot>
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper
                          elevation={3}
                          sx={{
                            p: "16px",
                            borderRadius: "12px",
                          }}
                        >
                          <Typography
                            fontSize="20px"
                            fontWeight="bold"
                            sx={{
                              color: "#454746",
                            }}
                          >
                            {row.title}
                          </Typography>
                          <Divider sx={{ m: "4px 0" }} />
                          <Typography
                            fontSize="12px"
                            fontWeight={600}
                            sx={{
                              color: "#454746",
                            }}
                          >
                            {row.location}
                          </Typography>
                          <br />
                          <Typography
                            fontSize="16px"
                            sx={{
                              color: "#454746",
                            }}
                          >
                            {row.content}
                          </Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  ) : (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent>
                        <div>
                          <Chip
                            endDecorator={<CalendarMonthTwoToneIcon />}
                            sx={{
                              bgcolor: "#F2F6FC",
                            }}
                          >
                            {`${row.start_time} - ${row.end_time}`}
                          </Chip>
                          <br />
                          <Chip
                            endDecorator={<PlaceTwoToneIcon />}
                            sx={{
                              bgcolor: "#F2F6FC",
                              mt: "10px",
                            }}
                          >
                            {row.city}
                          </Chip>
                        </div>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: "#D3E3FD" }}>
                          {row.icon}
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper
                          elevation={3}
                          sx={{
                            p: "16px",
                            borderRadius: "12px",
                          }}
                        >
                          <Typography
                            fontSize="20px"
                            fontWeight="bold"
                            sx={{
                              color: "#454746",
                            }}
                          >
                            {row.title}
                          </Typography>
                          <Divider sx={{ m: "4px 0" }} />
                          <Typography
                            fontSize="12px"
                            fontWeight={600}
                            sx={{
                              color: "#454746",
                            }}
                          >
                            {row.location}
                          </Typography>
                          <br />
                          <Typography
                            fontSize="16px"
                            sx={{
                              color: "#454746",
                            }}
                          >
                            {row.content}
                          </Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  )
                )
              : null}
          </Timeline>
        </div>
        <div className="experience-small">
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {props.data
              ? props.data.map((row: any, index: number) =>
                  index === props.data.length - 1 ? (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: "#D3E3FD" }}>
                          {row.icon}
                        </TimelineDot>
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper
                          elevation={3}
                          sx={{
                            p: "16px",
                            borderRadius: "12px",
                          }}
                        >
                          <Typography
                            fontSize="20px"
                            fontWeight="bold"
                            sx={{
                              color: "#454746",
                            }}
                          >
                            {row.title}
                          </Typography>
                          <Divider sx={{ m: "4px 0" }} />
                          <Typography
                            fontSize="12px"
                            fontWeight={600}
                            sx={{
                              color: "#454746",
                            }}
                          >
                            {row.location}
                          </Typography>
                          <Typography
                            fontSize="12px"
                            startDecorator={<CalendarMonthTwoToneIcon />}
                            sx={{
                              color: "#454746",
                              mt: "8px",
                            }}
                          >
                            {`${row.start_time} - ${row.end_time}`}
                          </Typography>
                          <Typography
                            fontSize="12px"
                            startDecorator={<PlaceTwoToneIcon />}
                            sx={{
                              color: "#454746",
                              mt: "8px",
                            }}
                          >
                            {`${row.city}`}
                          </Typography>
                          <Divider sx={{ m: "4px 0" }} />
                          <br />
                          <Typography>{row.content}</Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  ) : (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: "#D3E3FD" }}>
                          {row.icon}
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper
                          elevation={3}
                          sx={{
                            p: "16px",
                            borderRadius: "12px",
                          }}
                        >
                          <Typography
                            fontSize="20px"
                            fontWeight="bold"
                            sx={{
                              color: "#454746",
                            }}
                          >
                            {row.title}
                          </Typography>
                          <Divider sx={{ m: "4px 0" }} />
                          <Typography
                            fontSize="12px"
                            fontWeight={600}
                            sx={{
                              color: "#454746",
                            }}
                          >
                            {row.location}
                          </Typography>
                          <Typography
                            fontSize="12px"
                            startDecorator={<CalendarMonthTwoToneIcon />}
                            sx={{
                              color: "#454746",
                              mt: "8px",
                            }}
                          >
                            {`${row.start_time} - ${row.end_time}`}
                          </Typography>
                          <Typography
                            fontSize="12px"
                            startDecorator={<PlaceTwoToneIcon />}
                            sx={{
                              color: "#454746",
                              mt: "8px",
                            }}
                          >
                            {`${row.city}`}
                          </Typography>
                          <Divider sx={{ m: "4px 0" }} />
                          <br />
                          <Typography>{row.content}</Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  )
                )
              : null}
          </Timeline>
        </div>
      </CardContent>
    </Card>
  );
}
