import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useToast } from "@chakra-ui/react";
import api from "../../services/api";
import { v4 as uuidv4 } from "uuid";

interface EventsProps {
  children: ReactNode;
}

interface EventsProviderData {
  buyEventTicket: (event: EventData) => void;
  allEvents: EventData[];
  userEvents: EventData[];
  getUserEvents: (userId: number) => void;
  getAllEvents: () => void;
  deleteEvent: (eventId: string) => void;
}

interface EventData {
  id: string;
  name: string;
  description: string;
  place: string;
  beginDate: string;
  endDate: string;
  hour: string;
  imageLink: string;
  hostName: string;
  isUniversity: boolean;
  price: number;
  userId?: number;
}

const EventsContext = createContext<EventsProviderData>(
  {} as EventsProviderData
);

export const EventsProvider = ({ children }: EventsProps) => {
  const toast = useToast();

  const token: string = localStorage.getItem("@Eventify:token") || "";
  const userId = Number(localStorage.getItem("@Eventify:userId"));

  const [allEvents, setAllEvents] = useState<EventData[]>([]);
  const [userEvents, setUserEvents] = useState<EventData[]>([]);

  useEffect(() => {
    api.get("/events").then((response) => {
      setAllEvents(response.data);
    });
  }, [token, allEvents]);

  useEffect(() => {
    api.get(`/eventsBought?userId=${userId}`).then((response) => {
      setUserEvents(response.data);
    });
  }, [token, userId, userEvents]);

  const getAllEvents = () => {
    api.get("/events").then((response) => {
      setAllEvents(response.data);
    });
  };

  const getUserEvents = (userId: number) => {
    api.get(`/eventsBought?userId=${userId}`).then((response) => {
      setUserEvents(response.data);
    });
  };

  const buyEventTicket = (event: EventData) => {
    const newId = uuidv4();
    const newEvent = { ...event, userId, id: newId };

    const isExistingEvent = userEvents.some(
      (userEvent) =>
        userEvent.userId === userId && userEvent.name === event.name
    );

    if (isExistingEvent === true) {
      return toast({
        position: "top",
        title: "Você já tem seu ingresso para esse evento!",
        duration: 3000,
        isClosable: true,
        status: "error",
      });
    }

    api
      .post("/eventsBought", newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast({
          position: "top",
          title: "Ingresso garantido!",
          duration: 3000,
          isClosable: true,
          containerStyle: {
            backgroundColor: "blue.200",
          },
        });
      })
      .catch((err) => {
        toast({
          position: "top",
          title: "Por favor, tente mais tarde",
          duration: 3000,
          isClosable: true,
          status: "error",
        });
      });
  };

  const deleteEvent = (eventId: string) => {
    api
      .delete(`/eventsBought/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast({
          position: "top",
          title: "Que pena :(",
          duration: 3000,
          isClosable: true,
          containerStyle: {
            backgroundColor: "blue.200",
          },
        });
      })
      .catch((err) => {
        toast({
          position: "top",
          title: "Por favor, tente mais tarde",
          duration: 3000,
          isClosable: true,
          status: "error",
        });
      });
  };

  return (
    <EventsContext.Provider
      value={{
        buyEventTicket,
        allEvents,
        userEvents,
        getUserEvents,
        getAllEvents,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
