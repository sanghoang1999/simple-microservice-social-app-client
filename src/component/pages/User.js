import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../Screams/Scream";
import { getUserDetails } from "../../actions/user";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { SkeletonScream } from "../../utils/SkeletonScream";
import StaticProfile from "../Profile/StaticProfile";
import ProfileSkeleton from "../../utils/ProfileSkeleton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const useStyles = makeStyles(theme => ({
  screamWrap: {
    [theme.breakpoints.down("sm")]: {
      padding: "0 5px"
    }
  }
}));

const User = ({
  getUserDetails,
  scream: { screams, loading },
  profile,
  match: {
    params: { handle, screamId }
  }
}) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");
  const [openDialog, setOpenDialog] = useState(true);
  console.log(screamId);
  useEffect(() => {
    getUserDetails(handle);
  }, [handle]);
  return (
    <Grid container spacing={2}>
      <Grid
        item
        sm={8}
        sx={12}
        className={classes.screamWrap}
        style={{ width: "100%" }}
      >
        {loading ? (
          <SkeletonScream />
        ) : (
          (screams = null ? (
            <p>No screams from this user</p>
          ) : screamId === null ? (
            screams.map(scream => <Scream scream={scream} key={scream.id} />)
          ) : (
            screams.map(scream => {
              if (scream.id !== screamId)
                return <Scream scream={scream} key={scream.id} />;
              else
                return (
                  <Scream
                    scream={scream}
                    key={scream.id}
                    openDialog
                    rdNum={Math.random() * 10000000}
                  />
                );
            })
          ))
        )}
      </Grid>
      {matches ? (
        <Grid item sm={4} sx={12}>
          {profile == null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={profile} />
          )}
        </Grid>
      ) : null}
    </Grid>
  );
};

const mapStateToProps = state => ({
  scream: state.scream,
  profile: state.profile
});

export default connect(mapStateToProps, { getUserDetails })(User);
