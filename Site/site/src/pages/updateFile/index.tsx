import { Box, Button, Container, TextField } from "@mui/material";
import DrawerBar from "../../components/drawerBar/drawerBar";
import { ChangeEvent, useEffect, useState } from "react";
import { SnackBarInfo } from "../../components/snackBarInfo/snackBarInfo";
import { SendVideoService} from "../../services/sendVideoSevice";
import { UserDashboard } from "../../types/userDashboard";
import { AuthService } from "../../services/loginService";
import { getToken } from "../../utils/auth";

export function UpdateFilePage() {
  const [open, setOpen] = useState({
    open: false,
    type: "success" as "success" | "error" | "info",
    message: "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [data, setData] = useState<UserDashboard | null>();
  const [dataToSend, setDataToSend] = useState({
    name: "",
    time: "",
    video: null,
    userId: ""
  })
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setVideoFile(files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!videoFile) {
      alert("Por favor, selecione um arquivo de vídeo primeiro.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
        const _data = {
            name: dataToSend.name,
            time: dataToSend.time,
            video: videoFile,
            userId: data?.id
        }
      SendVideoService(_data)
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
  useEffect(() => {
    AuthService(String(getToken())).then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <>
      <DrawerBar title="Update File" />
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 2,
          gap: 2,
        }}
      >
        <h1>Update File</h1>
        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={2}
          >
            <input type="file" onChange={handleFileChange} />
            <TextField label="Nome do Vídeo" onChange={(newValue) => {
                setDataToSend({...dataToSend, name: newValue.target.value})
            }}/>
            <TextField label="Duração do Vídeo" onChange={(newValue) => {
                setDataToSend({...dataToSend, time: newValue.target.value})
            }}/>
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
