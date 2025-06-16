package models

type Review struct {
	ID      uint   `json:"id" gorm:"primaryKey"`
	User    string `json:"user"`
	Rating  int    `json:"rating" binding:"required" gorm:"check:rating >= 1 AND rating <= 5"`
	Comment string `json:"comment" binding:"required"`
}
