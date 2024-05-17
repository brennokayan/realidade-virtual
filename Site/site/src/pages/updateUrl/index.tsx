import { Box, Button, Container, TextField } from "@mui/material";
import DrawerBar from "../../components/drawerBar/drawerBar";
import { useEffect, useState } from "react";
import { SnackBarInfo } from "../../components/snackBarInfo/snackBarInfo";
import { UserDashboard } from "../../types/userDashboard";
import { AuthService } from "../../services/loginService";
import { getToken } from "../../utils/auth";
import { SendUrlVideoService } from "../../services/sendUrlVideo";

export function UpdateUrlPage() {
  const [open, setOpen] = useState({
    open: false,
    type: "success" as "success" | "error" | "info",
    message: "",
  });

  const [data, setData] = useState<UserDashboard | null>();
  const [dataToSend, setDataToSend] = useState({
    name: "",
    time: "",
    url: "",
    userId: "",
  });

  useEffect(() => {
    AuthService(String(getToken())).then((response) => {
      setData(response.data);
    });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const _data = {
        name: dataToSend.name,
        time: dataToSend.time,
        url: dataToSend.url,
        userId: data?.id,
      };
      SendUrlVideoService(_data)
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
  }
  return (
    <>
      <DrawerBar title="Update URL" />
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 2,
          gap: 2,
        }}
      >
        <h1>Enviar URL de video</h1>
        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={2}
          >
            <TextField
              label="URL do Vídeo"
              onChange={(newValue) => {
                setDataToSend({ ...dataToSend, url: newValue.target.value });
              }}
            />
            <TextField
              label="Nome do Vídeo"
              onChange={(newValue) => {
                setDataToSend({ ...dataToSend, name: newValue.target.value });
              }}
            />
            <TextField
              label="Duração do Vídeo"
              onChange={(newValue) => {
                setDataToSend({ ...dataToSend, time: newValue.target.value });
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
