package controllers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CreateTheatreInput struct {
	Name        string   `json:"name" binding:"required"`
	Address     string   `json:"address" binding:"required"`
	City        string   `json:"city" binding:"required"`
	State       string   `json:"state" binding:"required"`
	Status      string   `json:"status" binding:"required"`
	Screens     int      `json:"screens" binding:"required"`
	Movies      []string `json:"movies" binding:"required"`
	TheatreIcon string   `json:"theatreIcon"`
}

func PostTheatre(c *gin.Context) {
	var input CreateTheatreInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	theatre := models.Theatre{
		Name:        input.Name,
		Address:     input.Address,
		City:        input.City,
		State:       input.State,
		Status:      input.Status,
		Screens:     input.Screens,
		Movies:      input.Movies,
		TheatreIcon: input.TheatreIcon,
	}

	if err := models.DB.Create(&theatre).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save theatre: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, theatre)
}

func GetTheatres(c *gin.Context) {
	var theatres []models.Theatre
	if err := models.DB.Find(&theatres).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch theatres: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": theatres})
}

func GetTheatreByID(c *gin.Context) {
	id := c.Param("id")

	var theatre models.Theatre
	if err := models.DB.First(&theatre, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Theatre not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": theatre})
}

func DeleteTheatre(c *gin.Context) {
	id := c.Param("id")

	var theatre models.Theatre
	if err := models.DB.First(&theatre, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Theatre not found"})
		return
	}

	if err := models.DB.Delete(&theatre).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete theatre: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Theatre deleted successfully"})
}

func UpdateTheatre(c *gin.Context) {
	id := c.Param("id")

	var theatre models.Theatre
	if err := models.DB.First(&theatre, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "Theatre not found"})
		return
	}

	var input CreateTheatreInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedFields := models.Theatre{
		Name:        input.Name,
		Address:     input.Address,
		City:        input.City,
		State:       input.State,
		Status:      input.Status,
		Screens:     input.Screens,
		Movies:      input.Movies,
		TheatreIcon: input.TheatreIcon,
	}

	if err := models.DB.Model(&theatre).Updates(updatedFields).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update theatre: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Theatre updated successfully", "data": theatre})
}
