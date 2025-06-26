package controllers

import (
	"net/http"

	"backend/models"

	"github.com/gin-gonic/gin"
)

type CreateCinemaInput struct {
	Title       string   `json:"title" binding:"required"`
	Description string   `json:"description" binding:"required"`
	Genre       string   `json:"genre" binding:"required"`
	Languages   []string `json:"languages" binding:"required"`
	StartDate   string   `json:"startDate"`
	EndDate     string   `json:"endDate"`
	Status      string   `json:"status" binding:"required"`
	PosterImage string   `json:"posterImage"`
}

func PostCinema(c *gin.Context) {
	var input CreateCinemaInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cinema := models.Cinema{
		Title:       input.Title,
		Description: input.Description,
		Genre:       input.Genre,
		Languages:   input.Languages,
		StartDate:   input.StartDate,
		EndDate:     input.EndDate,
		Status:      input.Status,
		PosterImage: input.PosterImage,
	}

	if err := models.DB.Create(&cinema).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save cinema: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, cinema)
}

func GetCinemas(c *gin.Context) {
	var cinemas []models.Cinema
	if err := models.DB.Find(&cinemas).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch cinemas: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cinemas})
}

func DeleteCinema(c *gin.Context) {
	id := c.Param("id")

	var cinema models.Cinema
	if err := models.DB.First(&cinema, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cinema not found"})
		return
	}

	if err := models.DB.Delete(&cinema).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete cinema: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Cinema deleted successfully"})
}

func UpdateCinema(c *gin.Context) {
	id := c.Param("id")

	var cinema models.Cinema
	if err := models.DB.First(&cinema, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cinema not found"})
		return
	}

	var input CreateCinemaInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedFields := models.Cinema{
		Title:       input.Title,
		Description: input.Description,
		Genre:       input.Genre,
		Languages:   input.Languages,
		StartDate:   input.StartDate,
		EndDate:     input.EndDate,
		Status:      input.Status,
		PosterImage: input.PosterImage,
	}

	if err := models.DB.Model(&cinema).Updates(updatedFields).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update cinema: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Cinema updated successfully", "data": cinema})
}
