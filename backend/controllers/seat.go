package controllers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func PostSeatSelection(c *gin.Context) {
	var input models.SeatSelection

	// retireves username from gin context
	username := c.MustGet("username").(string)

	// parse input and validate
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "invalid input",
			"details": err.Error(),
		})
		return
	}

	// assign the authenticated username to seat selection for recording purpose
	input.Username = username

	// insert the seat selection in the db
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

	// fetch all seat selects from the db
	if err := models.DB.Find(&seats).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not fetch booked seats"})
		return
	}

	// iterate through all the seats and just extract and append the "seat"
	bookedSeats := []string{}
	for _, seat := range seats {
		bookedSeats = append(bookedSeats, seat.Seat)
	}

	// return all booked seat ids in an array
	c.JSON(http.StatusOK, gin.H{"bookedSeats": bookedSeats})
}
