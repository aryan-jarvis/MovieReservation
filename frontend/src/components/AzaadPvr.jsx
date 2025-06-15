import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MovieCard() {
  return (
    <Card
      sx={{}}
      style={{
        display: "flex",
        borderColor: "#e0dfdf",
        backgroundColor: "ffffff",
        height: "8.68rem",
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        image="../src/assets/images/pvr_logo.png"
        style={{ width: "4rem" }}
      />
      <CardContent>
        <Typography style={{ fontSize: "1.6rem" }}>Azaad</Typography>
        <Typography style={{ fontSize: "0.8rem" }}>
          Cinepolis: Pacific NSP2, Delhi | Monday, May 26, 2025, 07:05 PM
        </Typography>
      </CardContent>
      {/* <CardActions style={{ marginLeft: "75rem" }}>
        <Button
          size="small"
          style={{
            backgroundColor: "#ff5295",
            color: "white",
            height: "3rem",
            width: "8.5rem",
          }}
        >
          View Ticket
        </Button>
      </CardActions> */}
    </Card>
  );
}
