import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import movieImg from "../assets/images/movie_img.png";

export default function MovieCard() {
  return (
    <Card
      sx={{
        maxWidth: 250,
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="350"
        image={movieImg}
        alt="Alice in Wonderland"
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" component="div" fontWeight={600}>
          Alice in Wonderland
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Adventure | UA13+ | English, Hindi
        </Typography>
        <Typography variant="body2" fontWeight={500} color="primary">
          4.5 ★★★★☆
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/description" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#FF5295",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#FF5295",
              },
            }}
          >
            Book Now
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
