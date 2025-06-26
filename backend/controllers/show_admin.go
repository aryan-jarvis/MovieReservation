package controllers

import (
	"net/http"

	"backend/models"

	"github.com/gin-gonic/gin"
)

type CreateShowInput struct {
	Movie       string   `json:"movie" binding:"required"`
	Theatre     string   `json:"theatre" binding:"required"`
	Date        string   `json:"date" binding:"required"`
	Languages   []string `json:"languages" binding:"required"`
	Showtime    string   `json:"showtime" binding:"required"`
	PosterImage string   `json:"posterImage"`
}

func PostShowAdmin(c *gin.Context) {
	var input CreateShowInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	show := models.Show_Admin{
		Movie:       input.Movie,
		Theatre:     input.Theatre,
		Date:        input.Date,
		Languages:   input.Languages,
		Showtime:    input.Showtime,
		PosterImage: input.PosterImage,
	}

	if err := models.DB.Create(&show).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save show: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, show)
}

func GetShowAdmin(c *gin.Context) {
	var shows []models.Show_Admin
	if err := models.DB.Find(&shows).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch shows: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": shows})
}

func GetShowAdminByID(c *gin.Context) {
	id := c.Param("id")

	var show models.Show_Admin
	if err := models.DB.First(&show, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Show not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": show})
}

func DeleteShowAdmin(c *gin.Context) {
	id := c.Param("id")

	var show models.Show_Admin
	if err := models.DB.First(&show, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Show not found"})
		return
	}

	if err := models.DB.Delete(&show).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete show: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Show deleted successfully"})
}

func UpdateShowAdmin(c *gin.Context) {
	id := c.Param("id")

	var show models.Show_Admin
	if err := models.DB.First(&show, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Show not found"})
		return
	}

	var input CreateShowInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedFields := models.Show_Admin{
		Movie:       input.Movie,
		Theatre:     input.Theatre,
		Date:        input.Date,
		Languages:   input.Languages,
		Showtime:    input.Showtime,
		PosterImage: input.PosterImage,
	}

	if err := models.DB.Model(&show).Updates(updatedFields).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update show: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Show updated successfully", "data": show})
}
