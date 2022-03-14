import {
  Flex,
  Heading,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Text,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Redirect } from "react-router-dom";
import * as yup from "yup";
import { AiOutlineMail, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { useState } from "react";
import { useAuth } from "../../providers/Auth";
import { Fade, ScaleFade } from "@chakra-ui/react";

interface UserData {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const token = localStorage.getItem("@Eventify:token") || "";
  const formSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({ resolver: yupResolver(formSchema) });

  const onSubmitFunction = (data: UserData) => {
    setIsLoading(true);
    login(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  if (token) {
    return <Redirect to={"/dashboard"} />;
  }

  return (
    <>
      <Flex>
        <Fade in={true} style={{ transitionDuration: "800ms" }}>
          <Center w={["0", "0", "50vw"]} h="100vh" bg="blue.100">
            <Heading
              fontSize={"5xl"}
              display={["none", "none", "inline"]}
              color="white"
              mb="50px"
            >
              Eventify
            </Heading>
          </Center>
        </Fade>
        <Center
          flexDirection={"column"}
          w={["100vw", "100vw", "50vw"]}
          h="100vh"
        >
          <Heading display={["", "", "none"]} color="blue.200" mb="50px">
            Eventify
          </Heading>
          <ScaleFade in={true} style={{ transitionDuration: "800ms" }}>
            <FormControl
              as="form"
              onSubmit={handleSubmit(onSubmitFunction)}
              w={["90vw", "32vw"]}
              minW="315px"
              p="20px"
              borderRadius="50px"
              textAlign={"center"}
              transition="all 0.8s"
              boxShadow={[
                "20px 30px 90px #d9d9d9, -41px -41px 82px #ffffff",
                "20px 40px 90px #d9d9d9, -41px -41px 82px #ffffff",
                "none",
              ]}
              _hover={{
                boxShadow: "20px 40px 90px #d9d9d9, -41px -41px 82px #ffffff",
              }}
            >
              <Text fontSize={"larger"} textAlign={"center"}>
                Login
              </Text>
              <VStack>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineMail />}
                    color="blue.200"
                    mt={"12px"}
                  />
                  <Input
                    {...register("email")}
                    mt={"12px"}
                    placeholder="E-mail"
                    variant={"filled"}
                  />
                </InputGroup>
                <FormHelperText color={"blue.200"} fontWeight="bold">
                  {errors.email?.message}
                </FormHelperText>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BiLockAlt />}
                    color="blue.200"
                    mt={"20px"}
                  />
                  <Input
                    {...register("password")}
                    type={show ? "text" : "password"}
                    mt={"20px"}
                    placeholder="Senha"
                    variant={"filled"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      mt={"40px"}
                      size="sm"
                      onClick={handleClick}
                      fontSize="25px"
                      variant="ghost"
                    >
                      {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText color={"blue.200"} fontWeight="bold">
                  {errors.password?.message}
                </FormHelperText>
              </VStack>
              <Button
                mt="25px"
                color={"blue.200"}
                _hover={{ backgroundColor: "blue.200", color: "white" }}
                _active={{ backgroundColor: "blue.200", color: "white" }}
                type="submit"
                isLoading={isLoading}
                loadingText="Entrando..."
              >
                Entrar
              </Button>
              <Text
                textAlign={"center"}
                _active={{ textDecoration: "underline", color: "blue.200" }}
                _hover={{ textDecoration: "underline", color: "blue.200" }}
                mt="20px"
              >
                {" "}
                <Link to="/register">Não tem conta? Cadastre-se aqui</Link>
              </Text>
            </FormControl>
          </ScaleFade>
        </Center>
      </Flex>
    </>
  );
};

export default Login;
