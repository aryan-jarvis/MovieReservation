package controllers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMovies(c *gin.Context) {
	var movies []models.Movie
	if err := models.DB.Find(&movies).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve movies"})
		return
	}
	c.JSON(http.StatusOK, movies)
}
