import { createContext, useContext, ReactNode } from "react";
import { useToast } from "@chakra-ui/react";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

interface AuthProviderData {
  registerUser: (formData: FormDataRegister) => void;
  login: (formData: FormDataLogin) => void;
  logout: () => void;
}

interface AuthProps {
  children: ReactNode;
}

interface FormDataRegister {
  name: string;
  email: string;
  password: string;
}

interface FormDataLogin {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProps) => {
  const history = useHistory();
  const toast = useToast();

  const registerUser = (formData: FormDataRegister) => {
    api
      .post("/register", formData)
      .then((response) => {
        localStorage.setItem("@Eventify:token", response.data.accessToken);
        localStorage.setItem("@Eventify:userName", response.data.user.name);
        localStorage.setItem("@Eventify:userId", response.data.user.id);
        toast({
          position: "top",
          title: "Cadastro concluído!",
          duration: 3000,
          isClosable: true,
          containerStyle: {
            backgroundColor: "blue.200",
          },
        });
        history.push("/dashboard");
      })
      .catch((_) => {
        toast({
          position: "top",
          title: "E-mail já existente",
          duration: 3000,
          isClosable: true,
          status: "error",
        });
      });
  };

  const login = (formData: FormDataLogin) => {
    api
      .post("/login", formData)
      .then((response) => {
        localStorage.setItem("@Eventify:token", response.data.accessToken);
        localStorage.setItem("@Eventify:userName", response.data.user.name);
        localStorage.setItem("@Eventify:userId", response.data.user.id);
        toast({
          position: "top",
          title: "Bem-vindo(a) de volta!",
          duration: 3000,
          isClosable: true,
          containerStyle: {
            backgroundColor: "blue.200",
          },
        });
        history.push("/dashboard");
      })
      .catch((_) => {
        toast({
          position: "top",
          title: "Credenciais incorretas",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ registerUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
