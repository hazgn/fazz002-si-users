import { Home, AddBox, Edit, PersonRemove } from "@mui/icons-material";

export const categories = [
  {
    id: "Menu",
    children: [
      {
        id: "Home",
        icon: <Home />,
        link: "/",
      },
      {
        id: "Create Users",
        icon: <AddBox />,
        link: "/create",
      },
      {
        id: "Edit Users",
        icon: <Edit />,
        link: `/edit/null`,
      },
      {
        id: "Delete Users",
        icon: <PersonRemove />,
        link: "/delete",
      },
    ],
  },
];
