import { Box, Typography, Link } from "@mui/material";
import moment from "moment";

export const columns = [
  {
    headerName: "No",
    field: "no",
    width: 80,
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
  {
    field: "id",
    headerName: "Actions",
    width: 220,
    headerAlign: "center",
    align: "center",
    renderCell: ({ formattedValue }) => (
      <Box
        sx={{
          display: "flex",
          minWidth: 150,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Link
          href={`/${formattedValue}/detail`}
          sx={{ textDecoration: "none" }}
        >
          <Typography>Detail</Typography>
        </Link>
        <Typography>|</Typography>
        <Link
          href={`/edit/${formattedValue}`}
          sx={{ textDecoration: "none", color: "green" }}
        >
          <Typography>Edit</Typography>
        </Link>
        <Typography>|</Typography>
        <Typography
          sx={{ color: "red", cursor: "pointer" }}
          onClick={() => {
            alert(formattedValue);
          }}
        >
          Delete
        </Typography>
      </Box>
    ),
  },
];
