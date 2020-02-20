import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../Screams/Scream";
import Profile from "../Profile/Profile";
import { getAllScreams, getPaginationScream } from "../../actions/scream";
import axios from "axios";
import { connect } from "react-redux";
import { SkeletonScream } from "../../utils/SkeletonScream";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";
const Home = ({
  scream: { numPage, loading, screams },
  getAllScreams,
  getPaginationScream
}) => {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openAddScream, setOpenAddScream] = useState(false);
  let [page, setPage] = useState(1);
  useEffect(() => {
    getPaginationScream(5, page);
  }, []);
  const fetchMoreData = () => {
    setPage((page += 1));
    getPaginationScream(5, page);
  };
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} sx={12}>
        {screams.length > 0 && !loading ? (
          <InfiniteScroll
            scrollThreshold={1}
            dataLength={screams.length}
            next={fetchMoreData}
            hasMore={page <= numPage}
            loader={
              <div style={{ textAlign: "center" }}>
                <CircularProgress size={20} />
              </div>
            }
          >
            {screams.map(scrm => (
              <Scream scream={scrm} key={scrm.id} />
            ))}
          </InfiniteScroll>
        ) : (
          <SkeletonScream />
        )}
      </Grid>
      <Grid item sm={4} sx={12}>
        <Profile
          openEditProfile={openEditProfile}
          onClikEditProfile={() => setOpenEditProfile(!openEditProfile)}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  scream: state.scream
});

export default connect(mapStateToProps, { getAllScreams, getPaginationScream })(
  Home
);
