import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../Screams/Scream";
import Profile from "../Profile/Profile";
import { getUserDetails } from "../../actions/user";
import axios from "axios";
import { connect } from "react-redux";
import { SkeletonScream } from "../../utils/SkeletonScream";
import StaticProfile from "../Profile/StaticProfile";
import ProfileSkeleton from "../../utils/ProfileSkeleton";
import CircularProgress from "@material-ui/core/CircularProgress";
const User = ({
  getUserDetails,
  scream: { screams, loading },
  profile,
  match: {
    params: { handle, screamId }
  }
}) => {
  useEffect(() => {
    getUserDetails(handle);
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} sx={12}>
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
              else return <Scream scream={scream} key={scream.id} openDialog />;
            })
          ))
        )}
      </Grid>
      <Grid item sm={4} sx={12}>
        {profile == null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  scream: state.scream,
  profile: state.profile
});

export default connect(mapStateToProps, { getUserDetails })(User);
