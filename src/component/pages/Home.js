import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../Screams/Scream";
import Profile from "../Profile/Profile";
import { getAllScreams } from "../../actions/scream";
import axios from "axios";
import { connect } from "react-redux";
import ScreamSkeleton from "../../utils/ScreamSkeleton";
const Home = ({ scream: { screams, loading }, getAllScreams }) => {
  useEffect(() => {
    getAllScreams();
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} sx={12}>
        {screams.length > 0 && !loading ? (
          screams.map(scrm => <Scream scream={scrm} key={scrm.id} />)
        ) : (
          <ScreamSkeleton />
        )}
      </Grid>
      <Grid item sm={4} sx={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  scream: state.scream
});

export default connect(mapStateToProps, { getAllScreams })(Home);
