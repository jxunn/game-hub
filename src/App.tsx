import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
  // pack related variables in an object for cleaner code
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery); // will always be initialized to a GameQuery, just not necessarily one with properties

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`, // layout for mobile (single column)
        lg: `"nav nav" "aside main"`, // layout for 1024px
      }}
      templateColumns={{
        base: "1fr", // "1 fraction": col takes up all available space
        lg: "200px 1fr", // 1st col (aside bar) is 200px, 2nd col (card grid) takes up remaining available space
      }} // define width of columns for both scenarios, base & lg
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        />
      </GridItem>
      <Show above="lg">
        {/* padding for the aside bar from the edge of the screen */}
        <GridItem area="aside" paddingX={5}>
          {/* here, App gets notified & sets the selected genre */}
          <GenreList
            selectedGenre={gameQuery.genre} // for style: highlighting selected genre
            onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })} // pass in new object with new genre property
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading gameQuery={gameQuery} />
          <Flex marginBottom={5}>
            {/* another way to put spacing between platforms & sortorder menu dropdowns */}
            <Box marginRight={5}>
              <PlatformSelector
                selectedPlatform={gameQuery.platform} // for style: show the label of which platform is filtered on the menu
                onSelectPlatform={(platform) =>
                  setGameQuery({ ...gameQuery, platform })
                }
              />
            </Box>
            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setGameQuery({ ...gameQuery, sortOrder })
              }
            />
          </Flex>
        </Box>
        {/* in the next render, we pass selected genre & platform to the game grid */}
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
