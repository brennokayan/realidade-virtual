import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { SnackBarInfo } from "../../components/snackBarInfo/snackBarInfo";
import { DefaultIcons } from "../../utils/defaultIcons";
import { SendUserService } from "../../services/sendUserService";

export function CreateAccountPage() {
  const [open, setOpen] = useState({
    open: false,
    type: "success" as "success" | "error" | "info",
    message: "",
  });
  const [createData, setCreateData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (createData.password !== createData.confirmPassword) {
      setOpen({
        open: true,
        type: "error",
        message: "As senhas não coincidem!",
      })
    }
    else{
      SendUserService(createData).then(() => {
        setOpen({
          open: true,
          type: "success",
          message: "Usuário criado com sucesso!",
        });
      }).catch(() => {
        setOpen({
          open: true,
          type: "error",
          message: "Erro ao criar o usuário!",
        });
      })
    }
  };
  return (
    <>
      <Box
        bgcolor={"#407BFF"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100vh"}
        flexDirection={"column"}
        gap={2}
      >
        <Button
          variant="contained"
          onClick={() => {
            window.history.back();
          }}
          color="error"
          startIcon={<DefaultIcons.CloseDrawerIcon color="white" />}
        >
          Volatar ao Login
        </Button>

        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            bgcolor={"white"}
            borderRadius={2}
            p={6}
            boxShadow={"10px 10px 10px rgba(0,0,0,.8)"}
          >
            <h1>Crie sua conta agora!</h1>
            <TextField
              label="Nome"
              required
              onChange={(newValue) => {
                setCreateData({ ...createData, name: newValue.target.value });
              }}
            />
            <TextField
              label="E-mail"
              type="email"
              required
              onChange={(newValue) => {
                setCreateData({ ...createData, email: newValue.target.value });
              }}
            />
            <TextField
              label="Senha"
              required
              type="password"
              onChange={(newValue) => {
                setCreateData({
                  ...createData,
                  password: newValue.target.value,
                });
              }}
            />
            <TextField
              label="Confirmar senha"
              required
              type="password"
              onChange={(newValue) => {
                setCreateData({
                  ...createData,
                  confirmPassword: newValue.target.value,
                });
              }}
            />
            <Button variant="contained" type="submit">
              Criar Conta
            </Button>
          </Box>
        </form>
      </Box>
      <SnackBarInfo
        message={open.message}
        type={open.type}
        toOpen={open.open}
        handleClose={() => setOpen({ ...open, open: false })}
      />
    </>
  );
}
