import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { EventsProvider } from "./Events";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <EventsProvider>
      <AuthProvider>{children}</AuthProvider>
    </EventsProvider>
  );
};

export default Providers;
