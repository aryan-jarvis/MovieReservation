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

	// parse input and validate
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	// retrieves username from gin context after maybe decoding the jwt
	username := c.MustGet("username").(string)

	review := models.Review{
		User:    username,
		Rating:  input.Rating,
		Comment: input.Comment,
	}

	// save review into the db
	if err := models.DB.Create(&review).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save review"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "review submitted successfully"})
}

func GetReview(c *gin.Context) {
	var reviews []models.Review
	if err := models.DB.Find(&reviews).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch reviews: " + err.Error()})
		return
	}

	// only rating and comment
	var response []gin.H
	for _, r := range reviews {
		response = append(response, gin.H{
			"rating":  r.Rating,
			"comment": r.Comment,
		})
	}

	c.JSON(http.StatusOK, gin.H{"data": response})
}
