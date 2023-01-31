import { Typography } from "@mui/material";
import moment from "moment";

export const column = [
  {
    headerName: "No",
    field: "no",
    renderCell: ({ formattedValue }) => (
      <Typography>{formattedValue}</Typography>
    ),
  },
  {
    field: "fullname",
    headerName: "Fullname",
    width: 140,
  },
  {
    field: "email",
    headerName: "Email",
    width: 240,
  },
  {
    field: "created_at",
    headerName: "Created At",
    renderCell: ({ formattedValue }) => (
      <Typography>
        {formattedValue
          ? moment(formattedValue).format("MMMM Do YYYY, h:mm:ss a")
          : "Empty"}
      </Typography>
    ),
    width: 240,
  },
];
