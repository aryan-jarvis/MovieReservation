package models

import "gorm.io/gorm"

type Booking struct {
	gorm.Model
	UserID uint
	TxnID  string `gorm:"unique"`
	Amount int
	Status string
	Seats  string
	ShowID uint
}
