import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  // when a genre is selected, GenreList should notify App to setSelectedGenre (the component holding a state should be the one updating it)
  onSelectGenre: (genre: Genre) => void; // pass a callback fn that does setSelectedGenre
  selectedGenre: Genre | null; // App passes selected genre, and when we render it, the font will be bolded
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data, isLoading, error } = useGenres(); // gets genres from useGenres, which gets them via useData.ts

  // the following 2 lines are no longer needed, but it's safe to keep it
  if (error) return null; // nothing will render in sidebar if there's an error
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data.map(
          (
            genre // maps each genre to a <li> component
          ) => (
            <ListItem key={genre.id} paddingY="5px">
              <HStack>
                <Image
                  boxSize="32px"
                  borderRadius={8}
                  objectFit="cover" // fit image to container while preserving aspect ratio
                  src={getCroppedImageUrl(genre.image_background)}
                />
                <Button
                  whiteSpace="normal" // the button doesn't wrap text; set whiteSpace to normal, as opposed to 'no wrap'
                  textAlign="left"
                  fontWeight={
                    genre.id === selectedGenre?.id ? "bold" : "normal"
                  } // render the selected genre as bolded & other genres as normal
                  onClick={() => onSelectGenre(genre)}
                  fontSize="lg"
                  variant="link"
                >
                  {genre.name}
                </Button>
              </HStack>
            </ListItem>
          )
        )}
      </List>
    </>
  );
};

export default GenreList;
