package controllers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func PostReview(c *gin.Context) {
	var input struct {
		Rating  int    `json:"rating" binding:"required"`
		Comment string `json:"comment" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	username := c.MustGet("username").(string) // from middleware

	review := models.Review{
		User:    username,
		Rating:  input.Rating,
		Comment: input.Comment,
	}

	if err := models.DB.Create(&review).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save review"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "review submitted successfully"})
}
