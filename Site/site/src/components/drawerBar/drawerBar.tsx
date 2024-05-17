import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { logout } from "../../utils/auth";
import { DefaultIcons } from "../../utils/defaultIcons";
import { ListItemDrawer } from "./components/listItemDrawer";

interface Props {
  title: string;
}
type Anchor = "left";

export default function DrawerBar(Props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const list = (anchor: Anchor) => (
    <Box role="presentation" onKeyDown={toggleDrawer(anchor, false)}>
      <Box display={"flex"} alignItems={"center"} px={2} gap={2}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {Props.title}
        </Typography>
        <IconButton onClick={toggleDrawer(anchor, false)}>
          <DefaultIcons.CloseDrawerIcon size={24} color="black" />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItemDrawer
          title="Dashboard"
          icon={<DefaultIcons.DashboardMenuIcon color="black" size={24} />}
          index={0}
          path="/dashboard"
        />
        <ListItemDrawer
          title="Enviar Arquivo"
          icon={<DefaultIcons.CursoMenuIcon color="black" size={24} />}
          index={1}
          path="/update"
        />
        <ListItemDrawer
          title="Enviar Url"
          icon={<DefaultIcons.CursoMenuIcon color="black" size={24} />}
          index={2}
          path="/update-url"
        />
        <ListItemDrawer
          title="Enviar Paredes"
          icon={<DefaultIcons.CursoMenuIcon color="black" size={24} />}
          index={2}
          path="/update-wall"
        />
        <ListItemDrawer
          title="Enviar Luzes"
          icon={<DefaultIcons.CursoMenuIcon color="black" size={24} />}
          index={2}
          path="/update-light"
        />
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      boxShadow={"0px 1px 2px rgba(0,0,0,0.8) "}
      bgcolor={"primary.main"}
      px={2}
    >
      <Box display="flex" alignItems={"center"} gap={2}>
        <IconButton
          color="inherit"
          size="large"
          onClick={toggleDrawer("left", true)}
        >
          <DefaultIcons.MenuIcon size={36} color="white" />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "white" }}
        >
          {Props.title}
        </Typography>
      </Box>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <DefaultIcons.UserCircleIcon size={36} color="white" />
      </IconButton>
      <Menu
        sx={{ marginTop: 4, marginRight: 2, paddingX: 16 }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box
          display={"flex"}
          flexDirection={"row-reverse"}
          alignItems={"center"}
        >
          <Typography variant="h6" component="div" sx={{ px: 2 }}>
            Olá, usuário(a)
          </Typography>
          <IconButton onClick={handleClose}>
            <DefaultIcons.CloseMenuIcon size={24} color="black" />
          </IconButton>
        </Box>
        <Divider />
        <MenuItem
          sx={{ display: "flex", gap: 2, fontSize: 24 }}
          onClick={() => {}}
        >
          <DefaultIcons.UserCircleIcon />
          Perfil
        </MenuItem>
        <MenuItem
          sx={{ display: "flex", gap: 2, fontSize: 22 }}
          onClick={() => logout()}
        >
          <DefaultIcons.LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
      <Drawer
        anchor={"left"}
        open={state}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </Box>
  );
}
