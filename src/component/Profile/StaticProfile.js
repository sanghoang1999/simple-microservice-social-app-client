import React, { Component, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import EditDetail from "./EditDetail";
// MUI stuff
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import { uploadImage } from "../../actions/user";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles(theme => ({
  avatar: {
    width: 150,
    height: 150,
    marginTop: theme.spacing(1.5)
  },
  card: {
    textAlign: "center"
  },
  avatarWrap: {
    display: "flex",
    justifyContent: "center",
    position: "relative"
  },
  location: {
    position: "relative",
    top: 5,
    left: 5
  },
  location: {
    position: "relative",
    top: 7,
    left: 2
  },
  calendar: {
    position: "relative",
    top: 6,
    marginRight: 3
  },
  buttons: {
    width: "70%",
    margin: "0 auto",
    display: "flex",
    marginTop: 10,
    justifyContent: "space-evenly"
  },
  paper: {
    padding: "30px 0"
  },
  editImage: {
    position: "absolute",
    top: "76%",
    right: "30%"
  },
  progress: {
    position: "relative"
  },
  circular: {
    position: "absolute",
    top: "42%",
    left: "37%"
  }
}));

const StaticProfile = ({
  profile: { handle, createdAt, imageurl, bio, website, location },
  uploadImage,
  user: { credentials },
  match
}) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const classes = useStyles();
  const handleImageChange = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    setIsUploaded(true);
    uploadImage(formData).then(() => {
      setIsUploaded(false);
    });
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  return (
    <Card className={classes.card}>
      <div className={classes.avatarWrap}>
        <div className={classes.progress}>
          <Avatar
            src={imageurl}
            className={classes.avatar}
            style={isUploaded ? { opacity: 0.5 } : { opacity: 1 }}
          />
          <CircularProgress
            className={classes.circular}
            style={isUploaded ? { display: "block" } : { display: "none" }}
          />
        </div>
        {match != null && match.params.handle === handle ? (
          <Fragment>
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <Tooltip onClick={handleEditPicture} title="Update Image">
              <Fab size="small" className={classes.editImage} color="inherit">
                <EditIcon color="primary" />
              </Fab>
            </Tooltip>
          </Fragment>
        ) : null}
      </div>
      <CardContent>
        <Typography
          component={Link}
          to={`/users/${handle}`}
          color="primary"
          variant="h5"
          gutterBottom
        >
          @{handle}
        </Typography>
        {bio && <Typography variant="body2">{bio}</Typography>}
        {location && (
          <Typography>
            <LocationOn className={classes.location} color="primary" />{" "}
            <Typography component="span">{location}</Typography>
          </Typography>
        )}
        {website && (
          <Typography>
            <LinkIcon className={classes.location} color="primary" />
            <Typography
              component="a"
              href={website}
              target="_blank"
              color="primary"
              rel="noopener noreferrer"
            >
              {" "}
              {website}
            </Typography>
          </Typography>
        )}
        <div>
          <CalendarToday className={classes.calendar} color="primary" />{" "}
          <span>
            Joined <Moment format="DD/MM/YYYY">{createdAt}</Moment>
          </span>
        </div>
        {credentials.handle === handle ? <EditDetail /> : null}
      </CardContent>
    </Card>
  );
};

StaticProfile.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps, { uploadImage })(StaticProfile);
