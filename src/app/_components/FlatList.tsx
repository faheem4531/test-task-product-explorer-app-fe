// components/FlatList.tsx
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";

interface FlatListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  loadMore: () => void;
  hasMore: boolean;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  keyExtractor: (item: T) => string | number;
  loading: boolean;
  error?: boolean; // Added error prop to handle error state
}

const FlatList = <T,>({
  data,
  renderItem,
  loadMore,
  hasMore,
  loader,
  endMessage,
  emptyMessage,
  keyExtractor,
  loading,
  error,
}: FlatListProps<T>) => {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMore}
      hasMore={hasMore && !error} // Prevent loading more when there is an error
      loader={
        // Always display the loader if loading
        loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            {loader || <CircularProgress />}
          </Box>
        ) : null
      }
      endMessage={
        !loading && !error && !hasMore ? ( // Ensure endMessage only shows when loading is false, no error, and no more items
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            {endMessage || <Typography>No more items to load.</Typography>}
          </Box>
        ) : null
      }
      style={{ overflow: "hidden" }}
    >
      <Box sx={{ m: "0 auto 100px", width: "100%" }}>
        {error ? ( // Display error message if error exists
          <Box sx={{ textAlign: "center", padding: "20px" }}>
            <Typography color="error">Failed to load data.</Typography>
          </Box>
        ) : data.length === 0 && !loading ? ( // Display empty message if no data and not loading
          <Box sx={{ textAlign: "center", padding: "20px" }}>
            {emptyMessage || <Typography>No data available.</Typography>}
          </Box>
        ) : (
          <Grid container spacing={2}>
            {data.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={keyExtractor(item)}>
                {renderItem(item)}
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </InfiniteScroll>
  );
};

export default FlatList;
