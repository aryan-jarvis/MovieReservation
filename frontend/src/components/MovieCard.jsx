import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MovieCard() {
  return (
    <Card sx={{ maxWidth: 250 }} style={{ borderRadius: "0.5rem" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        image="../src/assets/images/movie_img.png"
      />
      <CardContent>
        <Typography>Alice in Wonderland</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Adventure | UA13+ | English, Hindi
        </Typography>
        <Typography>4.5 ★★★★☆</Typography>
      </CardContent>
      <CardActions>
        <a href="http://localhost:5173/description">
          <Button
            size="small"
            style={{
              backgroundColor: "red",
              color: "white",
            }}
          >
            Book Now
          </Button>
        </a>
      </CardActions>
    </Card>
  );
}
