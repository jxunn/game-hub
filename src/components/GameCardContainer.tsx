import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  // pass in GameCard as child component
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    // no longer need fixed width for card containers; since the card grid stretches to fill remaining space, this space will be equally divided amongst the # cards
    <Box borderRadius={10} overflow="hidden">
      {children}
    </Box>
  );
};

export default GameCardContainer;
