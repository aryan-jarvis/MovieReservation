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
