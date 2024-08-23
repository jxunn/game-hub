import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";

interface Props {
  // pass selectedGenre & selectedPlatform to gameGrid for filtering behavior
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  // gets games & error from useGames.ts
  const { data, error, isLoading } = useGames(gameQuery); // pass selected genre to games hook
  const skeletons = [1, 2, 3, 4, 5, 6]; // we will show 6 skeleton cards during loading

  // if error occurs during fetching
  if (error) return <Text>{error}</Text>;

  return (
    <>
      {/* instead of the # of columns being a fixed value, we want it to change depending on screen size */}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={6}
      >
        {/* while loading, map each item in 'skeletons' to a GameCardSkeleton object */}
        {isLoading &&
          skeletons.map((skeleton) => (
            // must move key from GameCardSkeleton to GameCardContainer
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {data.map(
          (
            game // maps each game object to its own GameCard component
          ) => (
            // must move key from GameCard to GameCardContainer
            <GameCardContainer key={game.id}>
              <GameCard game={game} />
            </GameCardContainer>
          )
        )}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
