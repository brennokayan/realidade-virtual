import { useEffect, useState } from "react";
import { AuthService } from "../../services/loginService";
import { getToken } from "../../utils/auth";
import { Box, Typography } from "@mui/material";
import { UserDashboard } from "../../types/userDashboard";
import DrawerBar from "../../components/drawerBar/drawerBar";
export function UserPage() {
  const [data, setData] = useState<UserDashboard | null>();

  useEffect(() => {
    AuthService(String(getToken())).then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <>
      {/* <Navbar title="Dashboard" /> */}
      <DrawerBar title="Dashboard"/>
      {data ? (
        <Box sx={{ marginLeft: "24px" }}>
          <ul>
            <li>User: {data?.name}</li>
            <li>Email: {data?.email}</li>
            <li>UserId: {data?.id}</li>
            <li>Parede's: 
              <ul>
                {data.Wall.map((wall, index) => (
                  <div key={wall.id} style={{ margin: "10px 0px" }}>
                    <li>id: {index}</li>
                    <li>name: {wall.name} </li>
                    <li>color: {wall.color}</li>
                  </div>
                ))}
              </ul>
            </li>
            <li>
              Luze's: 
              <ul>
                {data.Light.map((light, index) => (
                  <div key={light.id} style={{ margin: "10px 0px" }}>
                    <li>id: {index}</li>
                    <li>name: {light.name} </li>
                    <li>color: {light.color}</li>
                    <li>ilumminence: {light.ilumminence}</li>
                    <li>range: {light.range}</li>
                  </div>
                ))}
              </ul>
            </li>
            <li>
              Video's:
              <ul style={{ marginLeft: "16px" }}>
                {data.Video.map((video, index) => (
                  <div key={video.id} style={{ margin: "10px 0px" }}>
                    <li>id: {index}</li>
                    <li>name: {video.name} </li>
                    <li>time: {video.time}</li>
                    <li>URL: {video.url}</li>
                  </div>
                ))}
              </ul>
            </li>
            
          </ul>
          {/* <li>
            <iframe
              width="560"
              height="315"
              src="https://drive.google.com/file/d/14d5CEgCwihWPbDnwUn2UwxKUWToDKjnj/preview"
              allow="autoplay; encrypted-media"
              allowfullscreen={true}
              title="Meu Vídeo"
            ></iframe>
          </li> */}
          <video width="600" controls>
            <source src={"D:/backup/Faculdade/Realidade Virtual e aumentada/realidade-virtual/API/uploads/8df8a1e1ce1def31220c8a90834d0648-ð±SUKUNA ABRE SUA FORNALHA DIVÃ­NA E AGORA TUDO ESTÃ... JUJUTSU KAISEN 258 OFICIAL.mp4"} type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </Box>
      ) : (
        <Typography>Carregando ...</Typography>
      )}
    </>
  );
}
