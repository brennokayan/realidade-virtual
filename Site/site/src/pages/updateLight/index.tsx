import { Box, Button, Container, TextField } from "@mui/material";
import DrawerBar from "../../components/drawerBar/drawerBar";
import { useEffect, useState } from "react";
import { SnackBarInfo } from "../../components/snackBarInfo/snackBarInfo";
import { UserDashboard } from "../../types/userDashboard";
import { AuthService } from "../../services/loginService";
import { getToken } from "../../utils/auth";
import { SendLightService } from "../../services/sendLightService";

export function UpdateLightPage() {
  const [open, setOpen] = useState({
    open: false,
    type: "success" as "success" | "error" | "info",
    message: "",
  });

  const [data, setData] = useState<UserDashboard | null>();
  const [dataToSend, setDataToSend] = useState({
    name: "",
    ilumminence: 0,
    range: 0,
    color: "",
    userId: "",
  });

  useEffect(() => {
    AuthService(String(getToken())).then((response) => {
      setData(response.data);
    });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const _data = {
        name: dataToSend.name,
        range: dataToSend.range,
        color: dataToSend.color,
        ilumminence: dataToSend.ilumminence,
        userId: data?.id,
      };
      SendLightService(_data)
        .then(() => {
          setOpen({
            open: true,
            type: "success",
            message: "Video enviado com sucesso!",
          });
        })
        .catch(() => {
          setOpen({
            open: true,
            type: "error",
            message: "Erro ao enviar o vídeo!",
          });
        });
    } catch (error) {
      setOpen({
        open: true,
        type: "error",
        message: "Erro ao enviar o vídeo!",
      });
    }
  };
  return (
    <>
      <DrawerBar title="Update Light" />
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 2,
          gap: 2,
        }}
      >
        <h1>Enviar Luzes</h1>
        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={2}
          >
            <TextField
              label="Nome da Luz"
              onChange={(newValue) => {
                setDataToSend({ ...dataToSend, name: newValue.target.value });
              }}
            />
            <TextField
              label="Iluiminação"
              onChange={(newValue) => {
                setDataToSend({
                  ...dataToSend,
                  ilumminence: Number(newValue.target.value),
                });
              }}
            />
            <TextField
              label="Distância"
              onChange={(newValue) => {
                setDataToSend({
                  ...dataToSend,
                  range: Number(newValue.target.value),
                });
              }}
            />
            <input
              type="color"
              onChange={(newValue) => {
                setDataToSend({ ...dataToSend, color: newValue.target.value });
              }}
            />
            <Button variant="contained" type="submit">
              Upload
            </Button>
          </Box>
        </form>
      </Container>
      <SnackBarInfo
        message={open.message}
        type={open.type}
        toOpen={open.open}
        handleClose={() => {
          setOpen({ ...open, open: false });
        }}
      />
    </>
  );
}
