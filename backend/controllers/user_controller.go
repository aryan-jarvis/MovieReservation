package controllers

import (
	"backend/models"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func GetUsers(c *gin.Context) {
	var users []models.User
	models.DB.Find(&users)
	c.IndentedJSON(http.StatusOK, users)
}

func PostUsers(c *gin.Context) {
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Create(&user)
	c.IndentedJSON(http.StatusCreated, user)
}

func GetUserByID(c *gin.Context) {
	var user models.User
	id := c.Param("id")
	if err := models.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "user not found"})
		return
	}
	c.IndentedJSON(http.StatusOK, user)
}

func Register(c *gin.Context) {
	var input struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	var existingUser models.User
	if err := models.DB.Where("name = ? OR email = ?", input.Name, input.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "user with the same name or email already exists"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to hash password"})
		return
	}

	user := models.User{Name: input.Name, Email: input.Email, Password: string(hashedPassword)}
	if err := models.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "could not create user"})
		return
	}

	token := utils.GenerateJWT(user.Name)
	c.JSON(http.StatusOK, gin.H{"token": token})
}

func Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	var user models.User
	if err := models.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	token := utils.GenerateJWT(user.Email)
	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"name":  user.Name,
	})

}

func Profile(c *gin.Context) {
	name := c.MustGet("username").(string)
	c.JSON(http.StatusOK, gin.H{"user": name})
}
