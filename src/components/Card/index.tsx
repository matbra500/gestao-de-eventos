import { Flex, Image, Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import ModalComponent from "../ModalComponent";
import { useEvents } from "../../providers/Events";
import { useLocation } from "react-router-dom";
import { Fade } from "@chakra-ui/react";

interface CardProps {
  imageLink: string;
  title: string;
  hostName: string;
  place: string;
  beginDate: string;
  endDate: string;
  hour: string;
  price: number;
  description: string;
  id: string;
}

const Card = ({
  imageLink,
  title,
  hostName,
  place,
  beginDate,
  endDate,
  hour,
  price,
  description,
  id,
}: CardProps) => {
  const onClose = () => {
    setIsOpen(false);
  };

  const onClose2 = () => {
    setIsOpen2(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const { allEvents, buyEventTicket, deleteEvent } = useEvents();

  const location = useLocation().pathname;

  const selectAndBuyEvent = (eventId: string) => {
    const selectedEvent = allEvents.filter((event) => event.id === eventId)[0];
    buyEventTicket(selectedEvent);
  };

  return (
    <>
      <Fade in={true} style={{ transitionDuration: "500ms" }}>
        <Flex
          flexDirection={"column"}
          textAlign="center"
          w="320px"
          h="500px"
          bg="gray.100"
          borderRadius={"20px"}
          m="20px"
        >
          <Flex
            borderRadius={"20px 20px 0 0"}
            w="100%"
            h="200px"
            bg="blue.100"
            justifyContent={"center"}
            p="10px"
            alignItems={"center"}
          >
            <Image maxW="100%" maxH="100%" src={imageLink} alt="eventImage" />
          </Flex>
          <VStack mt="8px" textAlign={"center"} spacing={"7px"}>
            <Text color="blue.200" fontWeight={"bold"} maxW="90%">
              {title}
            </Text>
            <Text>Organizador: {hostName}</Text>
            <Text>Onde: {place}</Text>
            <Flex w="100%" justifyContent={"space-evenly"}>
              <Text>De: {beginDate}</Text>
              <Text>At??: {endDate}</Text>
            </Flex>
            <Text>Hor??rio: {hour}</Text>
            <Text>Pre??o: {price === 0 ? "Gr??tis" : `R$ ${price}`}</Text>
          </VStack>
          <Flex
            alignItems={"flex-end"}
            h="100%"
            w="100%"
            mb="20px"
            justifyContent={"space-evenly"}
          >
            <Button
              variant={"outline"}
              _hover={{ backgroundColor: "blue.100" }}
              color="blue.200"
              borderColor={"blue.200"}
              onClick={() => setIsOpen(true)}
            >
              Ver mais
            </Button>
            {location === "/dashboard" ? (
              <Button
                onClick={() => selectAndBuyEvent(id)}
                color="green"
                variant={"outline"}
                borderColor="green"
                _hover={{ backgroundColor: "green.300" }}
              >
                Participar!
              </Button>
            ) : (
              <Button
                color="red.500"
                borderColor="red.500"
                _hover={{ backgroundColor: "red.200" }}
                variant={"outline"}
                onClick={() => setIsOpen2(true)}
              >
                N??o irei
              </Button>
            )}
          </Flex>
        </Flex>
      </Fade>
      <ModalComponent
        title={title}
        description={description}
        isOpen={isOpen}
        onClose={onClose}
      />
      <ModalComponent
        title="Tem certeza?"
        description="Voc?? vai cancelar sua participa????o a esse evento"
        isOpen={isOpen2}
        onClose={onClose2}
        hasSecondaryButton={true}
        callback={() => deleteEvent(id)}
      />
    </>
  );
};

export default Card;
