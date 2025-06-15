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
        border: "solid 0.1rem #e0dfdf",
        backgroundColor: "ffffff",
        height: "8.68rem",
        alignItems: "center",
        borderRadius: "1rem",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        image="../src/assets/images/harrypotter.png"
        style={{ width: "8rem", height: "8.68rem" }}
      />
      <CardContent>
        <p style={{ fontSize: "1rem" }}>Booked for:</p>
        <Typography style={{ fontSize: "1rem" }}>
          Alice in Wonderland
        </Typography>
        <Typography style={{ fontSize: "0.8rem" }}>
          Cinepolis: Pacific NSP2, Delhi
        </Typography>
        <p style={{ fontSize: "0.8rem" }}>2 hours ago</p>
      </CardContent>
      <CardActions style={{ marginLeft: "75rem" }}>
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
      </CardActions>
    </Card>
  );
}
