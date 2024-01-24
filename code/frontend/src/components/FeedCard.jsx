import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";
import { Share, ModeComment, LightbulbCircle, Code } from "@mui/icons-material";

import colors from "../styles/colors";

export default function FeedCard(props) {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        margin: "20px 20px",
        backgroundColor: "#303030",
        borderRadius: "10px",
      }}
    >
      <CardHeader
        sx={{
          borderBottom: "solid 1px black",
          borderRadius: "15px",
          color: colors.white,
          fontWeight: "bold",
        }}
        avatar={
          <Avatar
            sx={{ bgcolor: red, position: "static" }}
            aria-label="recipe"
            src={props.avatarImage}
          ></Avatar>
        }
        title={
          <span style={{ color: colors.white, fontWeight: "bold" }}>
            {props.cuber_name}
          </span>
        }
        subheader={
          <span style={{ color: colors.white }}>September 14, 2016</span>
        }
      />

      <CardContent>
        <Typography variant="p" component="div" sx={{ color: colors.white }}>
          New Cube😍
        </Typography>
      </CardContent>

      <CardMedia sx={{ height: "400px" }} image={props.image} title="" />

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          borderTop: "1px solid black",
        }}
      >
        <IconButton aria-label="add to favorites">
          <LightbulbCircle sx={{ color: colors.white }} />
          <Typography sx={{ fontSize: 12, paddingLeft: "10px" }}>24</Typography>
        </IconButton>

        <IconButton aria-label="show more">
          <ModeComment sx={{ color: colors.white }}></ModeComment>
          <Typography sx={{ fontSize: 12, paddingLeft: "10px" }}>24</Typography>
        </IconButton>

        <IconButton aria-label="object">
          <Share sx={{ color: colors.white }} />
          <Typography sx={{ fontSize: 12, paddingLeft: "10px" }}>24</Typography>
        </IconButton>

        <IconButton aria-label="code">
          <Code sx={{ color: colors.white }} />
          <Typography sx={{ fontSize: 12, paddingLeft: "10px" }}>24</Typography>
        </IconButton>

        <IconButton aria-label="share">
          <Share sx={{ color: colors.white }} />
          <Typography sx={{ fontSize: 12, paddingLeft: "10px" }}>24</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}
