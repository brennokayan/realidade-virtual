import { useEffect, useState } from "react";
import { AuthService } from "../../services/loginService";
import { getToken } from "../../utils/auth";
import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { UserDashboard } from "../../types/userDashboard";
import DrawerBar from "../../components/drawerBar/drawerBar";
import { UpdateVideoService } from "../../services/updateVideo";
import { DeleteVideoService } from "../../services/deleteVideoService";
export function UserPage() {
  const [data, setData] = useState<UserDashboard | null>();

  useEffect(() => {
    AuthService(String(getToken())).then((response) => {
      setData(response.data);
    });
  }, []);
  const handlePutVideo = (time: string, name: string, id: string) => {
    const data = {
      time: time,
      name: name,
    };
    UpdateVideoService(data, id);
  };
  return (
    <>
      {/* <Navbar title="Dashboard" /> */}
      <DrawerBar title="Dashboard" />
      {data ? (
        <Box px={6} py={2} display={"flex"} flexDirection={"column"} gap={2}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
            }}
          >
            <p>User: {data?.name}</p>
            <p>Email: {data?.email}</p>
            <p>UserId: {data?.id}</p>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
            }}
          >
            <h1>Parede's:</h1>
            {data.Wall.map((wall, index) => (
              <Box key={index}>
                <p>Id: {index}</p>
                <p>Name: {wall.name}</p>
                <p>Color: {wall.color}</p>
                <Box display={"flex"} gap={2}>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button variant="contained" color="error">
                    Delete
                  </Button>
                  <Button variant="contained" color="inherit">
                    Copy
                  </Button>
                </Box>
              </Box>
            ))}
          </Card>

          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
            }}
          >
            <h1>Luze's:</h1>
            <ul>
              {data.Light.map((light, index) => (
                <Box key={index}>
                  <p>id: {index}</p>
                  <p>name: {light.name} </p>
                  <p>color: {light.color}</p>
                  <p>ilumminence: {light.ilumminence}</p>
                  <p>range: {light.range}</p>
                  <Box display={"flex"} gap={2}>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                    <Button variant="contained" color="inherit">
                      Copy
                    </Button>
                  </Box>
                </Box>
              ))}
            </ul>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
            }}
          >
            <h1>Video's:</h1>
            <ul style={{ marginLeft: "16px" }}>
              {data.Video.map((video, index) => (
                <>
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    gap={2}
                    my={2}
                  >
                    <p>id: {video.id}</p>
                    <p>name: {video.name} </p>
                    <p>time: {video.time}</p>
                    <p>URL: {video.url}</p>
                    <Box display={"flex"} gap={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handlePutVideo(video.time, video.name, video.id)
                        }
                        disabled={index === 0}
                      >
                        {index === 0 ? "Reproduzindo" : "Play"}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          DeleteVideoService(video.id);
                        }}
                        disabled={index === 0}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                  <Divider />
                </>
              ))}
            </ul>
          </Card>
        </Box>
      ) : (
        <Typography>Carregando ...</Typography>
      )}
    </>
  );
}
