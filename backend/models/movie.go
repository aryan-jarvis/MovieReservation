package models

import "time"

type Movie struct {
	ID            uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	Name          string    `json:"name"`
	PosterURL     string    `json:"poster_url"`
	DirectorName  string    `json:"director_name"`
	Duration      int       `json:"duration"` // in minutes
	ReleaseDate   time.Time `json:"release_date"`
	Language      string    `json:"language"`
	Genre         string    `json:"genre"`
	Certificate   string    `json:"certificate"`
	AverageRating float32   `json:"average_rating"`
	Description   string    `json:"description"`
}
