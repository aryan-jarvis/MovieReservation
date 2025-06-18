package controllers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// func PostSeatSelection(c *gin.Context) {
// 	var input models.SeatSelection

// 	if err := c.ShouldBindJSON(&input); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
// 		return
// 	}

// 	if err := models.DB.Create(&input).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not save seat selection"})
// 		return
// 	}

//		c.JSON(http.StatusOK, gin.H{"message": "seat selection saved"})
//	}

func PostSeatSelection(c *gin.Context) {
	var input models.SeatSelection
	username := c.MustGet("username").(string)

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "invalid input",
			"details": err.Error(),
		})
		return
	}

	input.Username = username

	if err := models.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "could not save seat selection",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "seat selection saved",
		"data":    input,
	})
}

func GetBookedSeats(c *gin.Context) {
	var seats []models.SeatSelection

	if err := models.DB.Find(&seats).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not fetch booked seats"})
		return
	}

	bookedSeats := []string{}
	for _, seat := range seats {
		bookedSeats = append(bookedSeats, seat.Seat)
	}

	c.JSON(http.StatusOK, gin.H{"bookedSeats": bookedSeats})
}
