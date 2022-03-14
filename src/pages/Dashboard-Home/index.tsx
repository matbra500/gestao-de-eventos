import Header from "../../components/Header";
import Card from "../../components/Card";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useEvents } from "../../providers/Events";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useState } from "react";

const DashboardHome = () => {
  const { allEvents, getAllEvents } = useEvents();
  const token = localStorage.getItem("@Eventify:token") || "";
  const userName = localStorage.getItem("@Eventify:userName") || "";
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  useEffect(() => {
    getAllEvents(token);
  });

  if (!token) {
    return <Redirect to={"/login"} />;
  }

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
        flexWrap="wrap"
        w="100vw"
        justifyContent={"center"}
        textAlign={"center"}
        mt="35px"
      >
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
