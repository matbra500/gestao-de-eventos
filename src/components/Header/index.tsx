import {
  Flex,
  Text,
  Button,
  Link,
  Heading,
  Icon,
  Center,
  VStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/Auth";
import { useLocation, useHistory } from "react-router-dom";
import { GrMenu } from "react-icons/gr";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const { logout } = useAuth();
  return (
    <>
      <Flex
        w="100vw"
        h={["10vh", "11vh"]}
        justifyContent="space-between"
        alignItems={"center"}
        boxShadow="-1px 8px 36px -5px #d9d9d9"
        bg="white"
      >
        <Heading
          transition={"0.5s"}
          ml="40px"
          color="blue.200"
          _hover={{ filter: "drop-shadow(10px 15px 4px #89C2D9)" }}
          onClick={() => history.push("/dashboard")}
          cursor="pointer"
        >
          Eventify
        </Heading>
        <Flex
          display={["none", "flex", "flex"]}
          fontWeight={"bold"}
          justifyContent={"space-evenly"}
          w="50vw"
        >
          <Link
            onClick={() => history.push("/dashboard")}
            color={location.pathname === "/dashboard" ? "blue.200" : ""}
          >
            Home
          </Link>
          <Link
            onClick={() => history.push("/dashboard/myevents")}
            color={
              location.pathname === "/dashboard/myevents" ? "blue.200" : ""
            }
          >
            Meus eventos
          </Link>
          <Link onClick={() => logout()}>Sair</Link>
        </Flex>
        <Icon
          display={["inline", "none", "none"]}
          as={GrMenu}
          mr="40px"
          w={6}
          h={6}
          onClick={() => setIsOpen(true)}
        />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={"white"} />
          <DrawerHeader
            borderBottom={"1px solid black"}
            bg="blue.200"
            color="white"
          >
            Menu
          </DrawerHeader>

          <DrawerBody>
            <VStack>
              <Center
                w="100%"
                _active={{ backgroundColor: "#89C2D9" }}
                color={location.pathname === "/dashboard" ? "blue.200" : ""}
                h="70px"
                onClick={() => history.push("/dashboard")}
              >
                <Text fontSize={"25px"} fontWeight={"bold"}>
                  Home
                </Text>
              </Center>
              <Center
                w="100%"
                _active={{ backgroundColor: "#89C2D9" }}
                color={
                  location.pathname === "/dashboard/myevents" ? "blue.200" : ""
                }
                h="70px"
                onClick={() => history.push("/dashboard/myevents")}
              >
                <Text fontSize={"25px"} fontWeight={"bold"}>
                  Meus Eventos
                </Text>
              </Center>
              <Center
                w="100%"
                _active={{ backgroundColor: "#89C2D9" }}
                h="70px"
                onClick={() => logout()}
              >
                <Text fontSize={"25px"} fontWeight={"bold"}>
                  Logout
                </Text>
              </Center>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Voltar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
