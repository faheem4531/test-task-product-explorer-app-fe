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
}: FlatListProps<T>) => {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMore}
      hasMore={hasMore}
      loader={
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
      }
      endMessage={endMessage}
      style={{ overflow: "hidden" }}
    >
      <Box sx={{ m: "0 auto 100px", width: "100%" }}>
        {loading && data.length === 0 ? (
          <Box></Box>
        ) : data.length === 0 ? (
          <Box sx={{ textAlign: "center", padding: "20px" }}>
            {emptyMessage}
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
