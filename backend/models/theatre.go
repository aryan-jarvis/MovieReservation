package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Theatre struct {
	gorm.Model
	Name        string         `json:"name"`
	Address     string         `json:"address"`
	City        string         `json:"city"`
	State       string         `json:"state"`
	Status      string         `json:"status"`
	Screens     int            `json:"screens"`
	Movies      pq.StringArray `gorm:"type:text[]" json:"movies"`
	TheatreIcon string         `json:"theatreIcon"`
}
