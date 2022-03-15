import {
  Box,
  Center,
  Text,
  Flex,
  VStack,
  Heading,
  Image,
  Button,
} from "@chakra-ui/react";
import imageLandingPage from "../../assets/images/eventsLandingPage.png";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { ScaleFade } from "@chakra-ui/react";

const LandingPage = () => {
  const history = useHistory();
  const token = localStorage.getItem("@Eventify:token") || "";

  if (token) {
    return <Redirect to={"/dashboard"} />;
  }
  return (
    <Box>
      <Flex w="100vw" flexDirection={["column-reverse", "row"]}>
        <ScaleFade in={true} style={{ transitionDuration: "800ms" }}>
          <Center
            w={["94vw", "50vw"]}
            h={["30vh", "50vh"]}
            bg="blue.100"
            borderRadius={["0 50px 50px 0", "0 0 50px 0"]}
          >
            <Text
              maxW={["80vw", "40vw"]}
              textAlign="center"
              fontSize={["1.2rem", "1.5rem"]}
              fontWeight="bold"
            >
              Eventify, a melhor plataforma para você participar de seus eventos
              profissionais e acadêmicos favoritos, de forma simples!
            </Text>
          </Center>
        </ScaleFade>
        <Center w={["100vw", "50vw"]} h={["20vh", "50vh"]}>
          <Heading
            _hover={{
              transform: "scale(1.10)",
              transition: "0.3s",
            }}
            fontSize={"4.5rem"}
            color="blue.200"
          >
            Eventify
          </Heading>
        </Center>
      </Flex>
      <Flex w="100vw" flexDirection={["column-reverse", "row"]}>
        <Center w={["0", "50vw"]} h={["20vh", "50vh"]}>
          <Image src={imageLandingPage} alt="events" maxH="50vh" />
        </Center>
        <ScaleFade in={true} style={{ transitionDuration: "800ms" }}>
          <Center
            w={["100vw", "50vw"]}
            h={["30vh", "50vh"]}
            mt={["30px", "0"]}
            ml={["6vw", "0"]}
            bg="blue.200"
            borderRadius={["50px 0 0 50px", "50px 0 0 0"]}
          >
            <VStack spacing={"20px"}>
              <Button
                variant="ghost"
                _hover={{ backgroundColor: "gray.100", color: "blue.200" }}
                maxW={"150px"}
                size={"lg"}
                color="white"
                fontSize="1.5rem"
                onClick={() => history.push("/login")}
              >
                Entre aqui
              </Button>
              <Text color={"white"}>OU</Text>
              <Button
                variant="ghost"
                _hover={{ backgroundColor: "gray.100", color: "blue.200" }}
                maxW={"150px"}
                size={"lg"}
                color="white"
                fontSize="1.5rem"
                onClick={() => history.push("/register")}
              >
                Cadastre-se
              </Button>
            </VStack>
          </Center>
        </ScaleFade>
      </Flex>
    </Box>
  );
};

export default LandingPage;
