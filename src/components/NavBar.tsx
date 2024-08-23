import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    // space-between moves switch to the right side
    <HStack padding="10px">
      <Image src={logo} boxSize="60px" />
      {/* our search bar isn't a direct child component of App, but rather, the App's NavBar. for now, we will just pass onSearch down 2 levels by adding it as a Prop to this file */}
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack> // HStack lays out items horizontally
  );
};

export default NavBar;
