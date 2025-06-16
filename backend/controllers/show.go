package controllers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetShows(c *gin.Context) {
	var shows []models.Show
	if err := models.DB.Find(&shows).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve shows"})
		return
	}
	c.JSON(http.StatusOK, shows)
}
