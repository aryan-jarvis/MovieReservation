package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Show_Admin struct {
	gorm.Model
	Movie       string         `json:"movie"`
	Theatre     string         `json:"theatre"`
	Date        string         `json:"date"`
	Languages   pq.StringArray `gorm:"type:text[]" json:"languages"`
	Showtime    pq.StringArray `gorm:"type:text[]" json:"showtime"`
	PosterImage string         `json:"posterImage"`
}
