import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../Screams/Scream";
import axios from "axios";
const Home = props => {
  const [scream, setScream] = useState(null);
  useEffect(() => {
    axios
      .get("/scream")
      .then(res => {
        console.log(res.data);
        setScream(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return scream ? (
    <Grid container spacing={2}>
      <Grid item sm={8} sx={12}>
        {scream.map(scrm => (
          <Scream scream={scrm} key={scrm.id} />
        ))}
      </Grid>
      <Grid item sm={4} sx={12}>
        <p>Content...</p>
      </Grid>
    </Grid>
  ) : (
    <div>loading....</div>
  );
};

export default Home;
