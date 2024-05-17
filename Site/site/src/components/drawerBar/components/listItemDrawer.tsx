import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {IconProps} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
interface Props {
  title: string;
  icon: IconProps;
  index: number;
  path: string;
}

export function ListItemDrawer(Props: Props) {
  const navigate = useNavigate();
  return (
    <ListItem key={Props.index} disablePadding>
      <ListItemButton onClick={() => navigate(Props.path)}>
        <ListItemIcon>
          <>{Props.icon}</>
        </ListItemIcon>
        <ListItemText primary={Props.title} />
      </ListItemButton>
    </ListItem>
  );
}
