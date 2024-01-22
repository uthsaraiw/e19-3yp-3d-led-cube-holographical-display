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
  const [expanded, setExpanded] = React.useState(false);

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
        <IconButton aria-label="add to favorites" sx={{ position: "static" }}>
          <LightbulbCircle sx={{ color: colors.white }} />
        </IconButton>

        <ModeComment
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ color: colors.white }}
        ></ModeComment>

        <IconButton aria-label="object" sx={{ position: "static" }}>
          <Share sx={{ color: colors.white }} />
        </IconButton>

        <IconButton aria-label="code" sx={{ position: "static" }}>
          <Code sx={{ color: colors.white }} />
        </IconButton>

        <IconButton aria-label="share" sx={{ position: "static" }}>
          <Share sx={{ color: colors.white }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
