import { Box, Button, Container, TextField } from "@mui/material";
import DrawerBar from "../../components/drawerBar/drawerBar";
import { useEffect, useState } from "react";
import { SnackBarInfo } from "../../components/snackBarInfo/snackBarInfo";
import { UserDashboard } from "../../types/userDashboard";
import { AuthService } from "../../services/loginService";
import { getToken } from "../../utils/auth"
import { SendWallService } from "../../services/sendWallService";

export function UpdateWallPage() {
  const [open, setOpen] = useState({
    open: false,
    type: "success" as "success" | "error" | "info",
    message: "",
  });

  const [data, setData] = useState<UserDashboard | null>();
  const [dataToSend, setDataToSend] = useState({
    name: "",
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
        color: dataToSend.color,
        userId: data?.id,
      };
      SendWallService(_data)
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
      <DrawerBar title="Update Wall" />
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 2,
          gap: 2,
        }}
      >
        <h1>Enviar Paredes</h1>
        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={2}
          >
            <TextField
              label="Nome da parede"
              onChange={(newValue) => {
                setDataToSend({ ...dataToSend, name: newValue.target.value });
              }}
            />
            <input
              type="color"
              onChange={(newValue) => {
                setDataToSend({ ...dataToSend, color: newValue.target.value });
              }}
            />
            {/* <TextField
              label="Color"
              onChange={(newValue) => {
                setDataToSend({ ...dataToSend, time: newValue.target.value });
              }}
            /> */}
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
