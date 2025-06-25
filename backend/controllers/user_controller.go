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

	// fetch all the user
	models.DB.Find(&users)

	c.IndentedJSON(http.StatusOK, users)
}

func PostUsers(c *gin.Context) {
	var user models.User

	// parse the json from request body into user struct
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create user in the database
	models.DB.Create(&user)

	c.IndentedJSON(http.StatusCreated, user)
}

func GetUserByID(c *gin.Context) {
	var user models.User

	id := c.Param("id")

	// find first user in the given db with the given id
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

	// parse input and validate
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	// check if user already exists (user should have both -- unique name && unique email)
	var existingUser models.User
	if err := models.DB.Where("name = ? OR email = ?", input.Name, input.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "user with the same name or email already exists"})
		return
	}

	// hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to hash password"})
		return
	}

	// create and store user
	user := models.User{Name: input.Name, Email: input.Email, Password: string(hashedPassword)}
	if err := models.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "could not create user"})
		return
	}

	// return token
	token := utils.GenerateJWT(user.Name)
	c.JSON(http.StatusOK, gin.H{"token": token})
}

func Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	// parse input and validate
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	// check if email is already present in the db
	var user models.User
	if err := models.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	// compare bcrypt hashed password with it's plaintext equivalent
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	// return jwt token
	token := utils.GenerateJWT(user.Email)
	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"name":  user.Name,
	})
}

func Profile(c *gin.Context) {

	// retrieve username and return a json response with the username

	name := c.MustGet("username").(string)
	c.JSON(http.StatusOK, gin.H{"user": name})
}
