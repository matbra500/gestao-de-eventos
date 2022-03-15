import Header from "../../components/Header";
import Card from "../../components/Card";
import {
  Flex,
  Text,
  Button,
  Input,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEvents } from "../../providers/Events";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const DashboardHome = () => {
  const { allEvents } = useEvents();
  const token = localStorage.getItem("@Eventify:token") || "";
  const userName = localStorage.getItem("@Eventify:userName") || "";
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [searchValue, setSearchValue] = useState("");

  const showUniversityEvents = () => {
    const newArray = allEvents.filter((event) => event.isUniversity === true);
    setFilteredEvents(newArray);
    setSelectedFilter("university");
  };

  const showEnterpriseEvents = () => {
    const newArray = allEvents.filter((event) => event.isUniversity === false);
    setFilteredEvents(newArray);
    setSelectedFilter("enterprise");
  };

  const showAllEvents = () => {
    setFilteredEvents(allEvents);
    setSelectedFilter("all");
  };

  const searchEvent = () => {
    if (searchValue === "") {
      setSelectedFilter("all");
    } else {
      const newArray = allEvents.filter((event) =>
        event.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredEvents(newArray);
      setSelectedFilter("search");
    }
  };

  if (!token) {
    return <Redirect to={"/login"} />;
  }

  return (
    <>
      <Header />
      <Flex w="100vw" justifyContent={"center"} textAlign={"center"} mt="35px">
        <Text>
          Olá {userName}, aqui você pode ver e escolher os eventos que mais lhe
          interessam!
        </Text>
      </Flex>
      <Flex
        flexDirection={["column", "column", "row"]}
        justifyContent={["center", "center", "space-between"]}
        alignItems={"center"}
        mt="15px"
      >
        <InputGroup
          onKeyDown={(e) => (e.key === "Enter" ? searchEvent() : undefined)}
          ml={["0", "0", "20px"]}
          w={["80vw", "60vw", "30vw"]}
        >
          <Input
            size={"md"}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="Procure pelo título..."
          />
          <InputRightElement>
            <Button
              variant="ghost"
              mr="10px"
              size={"sm"}
              onClick={() => searchEvent()}
            >
              <Icon as={BiSearchAlt2} />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Flex
          mt={["15px", "0", "0"]}
          mr={["0", "0", "20px"]}
          flexWrap="wrap"
          justifyContent={"center"}
          textAlign={"center"}
        >
          <Button
            _hover={{}}
            _active={{}}
            m="10px"
            color="white"
            onClick={() => showUniversityEvents()}
            bg={selectedFilter === "university" ? "blue.200" : "gray.100"}
          >
            Acadêmicos
          </Button>

          <Button
            _hover={{}}
            _active={{}}
            m="10px"
            color="white"
            onClick={() => showEnterpriseEvents()}
            bg={selectedFilter === "enterprise" ? "blue.200" : "gray.100"}
          >
            Profissionais
          </Button>
          <Button
            _hover={{}}
            _active={{}}
            m="10px"
            color="white"
            onClick={() => showAllEvents()}
            bg={selectedFilter === "all" ? "blue.200" : "gray.100"}
          >
            Todos
          </Button>
        </Flex>
      </Flex>
      <Flex mt="10px" flexWrap={"wrap"}>
        {selectedFilter === "all"
          ? allEvents.map((event) => (
              <Card
                imageLink={event.imageLink}
                title={event.name}
                beginDate={event.beginDate}
                endDate={event.endDate}
                hostName={event.hostName}
                hour={event.hour}
                place={event.place}
                price={event.price}
                key={event.id}
                description={event.description}
                id={event.id}
              />
            ))
          : filteredEvents.map((event) => (
              <Card
                imageLink={event.imageLink}
                title={event.name}
                beginDate={event.beginDate}
                endDate={event.endDate}
                hostName={event.hostName}
                hour={event.hour}
                place={event.place}
                price={event.price}
                key={event.id}
                description={event.description}
                id={event.id}
              />
            ))}
      </Flex>
    </>
  );
};

export default DashboardHome;
