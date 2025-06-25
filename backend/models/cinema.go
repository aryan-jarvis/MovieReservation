package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Cinema struct {
	gorm.Model
	Title       string         `json:"title"`
	Description string         `json:"description"`
	Genre       string         `json:"genre"`
	Languages   pq.StringArray `gorm:"type:text[]" json:"languages"`
	StartDate   string         `json:"startDate"`
	EndDate     string         `json:"endDate"`
	Status      string         `json:"status"`
	PosterImage string         `json:"posterImage"`
}
