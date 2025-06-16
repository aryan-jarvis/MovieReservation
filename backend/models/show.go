package models

import "time"

type Show struct {
	ID         uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	MovieID    uint      `json:"movie_id"`
	TheatreID  uint      `json:"theatre_id"`
	TotalSeats int       `json:"total_seats"`
	StartTime  time.Time `json:"start_time"`
	EndTime    time.Time `json:"end_time"`
	Price      float64   `json:"price"`
	Duration   int       `json:"duration"` // in minutes
}
