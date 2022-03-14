import Header from "../../components/Header";
import Card from "../../components/Card";
import { useEvents } from "../../providers/Events";
import { Flex, Text, Center, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const DashboardUserEvents = () => {
  const { userEvents, getUserEvents } = useEvents();
  const token = localStorage.getItem("@Eventify:token") || "";
  const userId = Number(localStorage.getItem("@Eventify:userId"));

  const userName = localStorage.getItem("@Eventify:userName") || "";
  const history = useHistory();

  useEffect(() => {
    getUserEvents(token, userId);
  });

  if (!token) {
    return <Redirect to={"/login"} />;
  }

  if (userEvents.length > 0) {
    return (
      <>
        <Header />
        <Flex mt="20px" flexWrap={"wrap"}>
          {userEvents.map((event) => (
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
  } else {
    return (
      <>
        <Header />
        <Center h="80vh">
          <Flex
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
          >
            <Text w="250px" textAlign={"center"}>
              Ainda não marcou sua presença em nenhum evento, {userName}?
            </Text>
            <Button
              color="blue.200"
              mt="25px"
              onClick={() => history.push("/dashboard")}
            >
              Ver eventos disponíveis
            </Button>
          </Flex>
        </Center>
      </>
    );
  }
};

export default DashboardUserEvents;
