import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import handleExpandClick from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";
import {
  Share,
  Favorite,
  ModeComment,
  LightbulbCircle,
  Code,
} from "@mui/icons-material";

import colors from "../styles/colors";

export default function FeedCard() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card
      sx={{
        maxWidth: "100%",
        margin: "15px 15px",
        backgroundColor: "#303030",
      }}
    >
      <CardHeader
        sx={{
          borderBottom: "1px solid black",
          borderRadius: "10px",
          color: colors.white,
          fontWeight: "bold",
        }}
        avatar={
          <Avatar
            sx={{ bgcolor: red, position: "relative", zIndex: "0" }}
            aria-label="recipe"
          ></Avatar>
        }
        title={
          <span style={{ color: colors.white, fontWeight: "bold" }}>
            Cuber404
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

      <CardMedia
        sx={{ height: "400px" }}
        image="../assets/card1.jpeg"
        title="green iguana"
      />

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          borderTop: "1px solid black",
        }}
      >
        <IconButton aria-label="add to favorites">
          <LightbulbCircle sx={{ color: colors.white }} />
        </IconButton>

        <ModeComment
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ color: colors.white }}
        ></ModeComment>

        <IconButton aria-label="object">
          <Share sx={{ color: colors.white }} />
        </IconButton>

        <IconButton aria-label="code">
          <Code sx={{ color: colors.white }} />
        </IconButton>

        <IconButton aria-label="share">
          <Share sx={{ color: colors.white }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
