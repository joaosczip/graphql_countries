import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SkeletonCard from "./SkeletonCard";

const SkeletonCards: React.FC = () => {
  const mediaQuery = useMediaQuery("(max-width: 400px)");

  return (
    <div data-testid="skeleton">
      {mediaQuery ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
    </div>
  );
};

export default SkeletonCards;
