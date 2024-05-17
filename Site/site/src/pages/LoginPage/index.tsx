import { Box, Button, TextField, Typography } from "@mui/material";
import teste from "../../assets/imgLogin.jpeg";
import { LoginService } from "../../services/loginService";
import { login } from "../../utils/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Do something differently for this user

export function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // "teste@teste.com", "teste"
    LoginService(loginData).then((data) => {
      login(data.token);
    });
  };
  const navigate = useNavigate();
  return (
    <>
      <Box
        height={"100vh"}
        width={"100vw"}
        display={"flex"}
        flexDirection={{ lg: "row", xs: "column" }}
        // bgcolor="black"
      >
        <Box
          height={"100%"}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={2}
          bgcolor={"#407BFF"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            p={4}
            bgcolor={"#f5f5f5"}
            borderRadius={2}
            height={{ lg: "70%", xs: "80%" }}
            width={{ lg: "50%", xs: "90%" }}
            sx={{ boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.5)" }}
            justifyContent={"center"}
          >
            <Typography variant="h5" align="center">
              Cine3D-MAX
              <br /> UNEMAT-BBU
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={2}
              >
                <TextField
                  fullWidth
                  type="email"
                  label="E-mail"
                  required
                  onChange={(newValue) => {
                    setLoginData({
                      ...loginData,
                      email: newValue.target.value,
                    });
                  }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Senha"
                  required
                  onChange={(newValue) => {
                    setLoginData({
                      ...loginData,
                      password: newValue.target.value,
                    });
                  }}
                />
                <Button variant="contained" id="btn-login" type="submit">
                  Login
                </Button>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  gap={1}
                  flexDirection={"column"}
                >
                  <Button
                    variant="text"
                    color="inherit"
                    sx={{ fontSize: "12px" }}
                  >
                    Esqueceu sua senha?
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    sx={{ fontSize: "12px" }}
                    onClick={() => {
                      navigate("/create-account");
                    }}
                  >
                    Criar conta
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
        <Box
          visibility={{ lg: "visible", xs: "hidden" }}
          height={{ lg: "100%", xs: "0" }}
          width={{ lg: "100%", xs: "0" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img src={teste} alt="imagem login" height={"90%"} />
        </Box>
      </Box>
    </>
  );
}
