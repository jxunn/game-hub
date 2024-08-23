import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" />
      {/* mimic the structure of a game card */}
      <CardBody>
        {/* instead of heading and stuff, render a skeleton text */}
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default GameCardSkeleton;
