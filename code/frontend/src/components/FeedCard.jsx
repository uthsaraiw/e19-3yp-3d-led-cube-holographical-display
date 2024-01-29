import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  let postId = props.id;

  //main user things
  let mainUsername = props.mainUsername;
  let mainUserImage = props.mainUserImage;
  const email = localStorage.getItem("email");
  // const email = "kavi@gmail.com";

  // console.log("postusername", props.postUsername);

  // state variables
  const [comment, setComment] = useState("");
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [reacted, setReacted] = useState(props.reacts.includes(email));
  const [reactsCount, setReactsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(props.comments_count);
  const [allComments, setAllComments] = useState(props.comments);
  // const [allReactions, setAllReactions] = useState(props.reactions);

  // console.log("asd", allComments);

  // gotoOther's profil

  useEffect(() => {
    setReactsCount(props.reacts_count);
  }, [props.reacts_count]);
  useEffect(() => {
    setReacted(props.reacts.includes(email));
  }, [props.reacts.includes(email)]);

  const goToOtherProfile = (username) => {
    navigate(`/profile_feed/${username}`, {
      state: { email: `${props.email}` }, //  email of the post.
    });
  };

  const updateReaction = (email, postId) => {
    fetch(`http://16.171.4.112:5000/api/postfile/reactions`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (reacted) {
          setReactsCount(reactsCount - 1);
        } else {
          setReactsCount(reactsCount + 1);
        }
        setReacted(!reacted);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // update comment on the DB.

  const postNewComment = (mainUsername, postId, comment) => {
    // console.log(userName, postId);
    setCommentsCount(commentsCount + 1);

    // console.log("all comments", allComments);

    fetch(`http://16.171.4.112:5000/api/postfile/comments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userName: mainUsername,
        comment: comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAllComments(data); // Update the allComments state with the new comments
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
            {props.postUsername}
          </span>
        }
        subheader={<span style={{ color: colors.white }}>{props.date}</span>}
        onClick={() => {
          goToOtherProfile(props.postUsername);
        }}
      />
      {/* card content first part */}
      <CardContent>
        <Typography variant="p" component="div" sx={{ color: colors.white }}>
          {props.caption}
        </Typography>
      </CardContent>
      {/* only images for now */}

      {props.image !== null ? (
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
      ) : (
        <></>
      )}

      {/* Card actions section */}

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          borderTop: "1px solid black",
        }}
      >
        <IconButton
          aria-label="add to favorites"
          onClick={() => updateReaction(email, postId)}
        >
          <LightbulbCircle
            sx={{
              color: reacted ? colors.Purple : colors.white,
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
            {reactsCount}
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
            {commentsCount}
          </Typography>
        </IconButton>

        <IconButton aria-label="object">
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
            {props.object_counts}
          </Typography>
        </IconButton>

        <IconButton aria-label="code">
          <Code
            sx={{
              color: colors.white,
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
            {props.code_counts}
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
            {props.shares_count}
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
            <Avatar sx={{ width: 27, height: 27 }} src={mainUserImage}></Avatar>
            <TextField
              id="filled-basic"
              label="Comment"
              variant="filled"
              value={comment}
              sx={TextFieldStylesForCard}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              sx={{ color: colors.Purple, padding: 0, margin: 0 }}
              endIcon={<Send />}
              onClick={() => {
                postNewComment(mainUsername, props.id, comment);
                setComment("");
              }}
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
                    primary={comment.userName}
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
