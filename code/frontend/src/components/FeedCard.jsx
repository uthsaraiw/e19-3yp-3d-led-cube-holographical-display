import * as React from "react";
import { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Code from "@mui/icons-material/Code";
import Collapse from "@mui/material/Collapse";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";
import {
  Share,
  ModeComment,
  LightbulbCircle,
  Send,
  ViewInAr,
} from "@mui/icons-material";

import colors from "../styles/colors";
import { TextFieldStylesForCard } from "./LongStyles";

export default function FeedCard(props) {
  const email = "kavindu@gmail.com";

  let postId = props.id;

  let reactList = ["kavindu@gmail.com", "hello@gmail.com"]; //  update this after sapuni's part.
  let allComments = [
    { email: "kavindu@gmail.com", comment: "hello" },
    { email: "hello@gmail.com", comment: "fuck" },
  ];

  // state variables
  const [comment, setComment] = useState("");
  const [showCommentSection, setShowCommentSection] = useState(false);

  console.log(comment);

  // update react on the DB.
  const updateReaction = (email, postId) => {
    console.log(email, postId);
    fetch(`http://localhost:5000/api/test/testSomething/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: postId,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // update comment on the DB.

  const postNewComment = (email, postId, comment) => {
    console.log(email, postId);
    fetch(`http://localhost:5000/api/test/testSomething/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: postId,
        email: email,
        comment: comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
      {/* card content first part */}
      <CardContent>
        <Typography variant="p" component="div" sx={{ color: colors.white }}>
          New Cube😍
        </Typography>
      </CardContent>

      <CardMedia
        sx={{
          height: {
            xs: "200px",
            lg: "400px",
          },
        }}
        image={props.image}
        title=""
      />

      {/* Card actions section */}

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          borderTop: "1px solid black",
        }}
      >
        <IconButton aria-label="add to favorites">
          <LightbulbCircle
            sx={{
              color: reactList.includes(email) ? colors.Purple : colors.white,
              fontSize: { xs: "18px", lg: "28px" },
            }}
          />
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                lg: 12,
              },
              paddingLeft: {
                xs: "5px",
                lg: "10px",
              },
            }}
          >
            24
          </Typography>
        </IconButton>

        <IconButton
          aria-label="show more"
          onClick={() => setShowCommentSection(!showCommentSection)}
        >
          <ModeComment
            sx={{ color: colors.white, fontSize: { xs: "18px", lg: "28px" } }}
          ></ModeComment>
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                lg: 12,
              },
              paddingLeft: {
                xs: "5px",
                lg: "10px",
              },
            }}
          >
            24
          </Typography>
        </IconButton>

        <IconButton
          aria-label="object"
          onClick={() => updateReaction(email, props.id)}
        >
          <ViewInAr
            sx={{ color: colors.white, fontSize: { xs: "18px", lg: "28px" } }}
          />
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                lg: 12,
              },
              paddingLeft: {
                xs: "5px",
                lg: "10px",
              },
            }}
          >
            24
          </Typography>
        </IconButton>

        <IconButton aria-label="code">
          <Code
            sx={{
              color: colors.Purple,
              fontSize: { xs: "18px", lg: "28px" },
            }}
          />
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                lg: 12,
              },
              paddingLeft: {
                xs: "5px",
                lg: "10px",
              },
            }}
          >
            24
          </Typography>
        </IconButton>

        <IconButton aria-label="share">
          <Share
            sx={{ color: colors.white, fontSize: { xs: "18px", lg: "28px" } }}
          />
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                lg: 12,
              },
              paddingLeft: {
                xs: "5px",
                lg: "10px",
              },
            }}
          >
            24
          </Typography>
        </IconButton>
      </CardActions>

      {/* Comment section */}

      <Collapse in={showCommentSection}>
        <CardContent
          sx={{
            borderTop: "1px solid #000",
            height: "100px",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ width: 27, height: 27 }}></Avatar>
            <TextField
              id="filled-basic"
              label="Comment"
              variant="filled"
              sx={TextFieldStylesForCard}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              sx={{ color: colors.Purple, padding: 0, margin: 0 }}
              endIcon={<Send />}
              onClick={() => postNewComment(email, props.id, comment)}
            ></Button>
          </Box>

          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: colors.BlackBackground,
            }}
          >
            {/* Comments list */}

            {allComments.map((comment, index) => {
              return (
                <ListItem alignItems="center" key={index}>
                  <ListItemAvatar>
                    <Avatar
                      alt=""
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 27, height: 27 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ color: colors.BlackLow2 }}
                    primary={comment.email}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color={colors.BlackLow2}
                        >
                          {comment.comment}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}
