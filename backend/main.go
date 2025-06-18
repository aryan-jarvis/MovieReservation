package main

import (
	"log"
	"os"

	"backend/controllers"
	"backend/middlewares"
	"backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found. Using system environment variables.")
	}

	requiredEnv := []string{"SECRET_KEY", "PAYU_MERCHANT_KEY", "PAYU_MERCHANT_SALT", "PAYU_BASE_URL"}
	for _, key := range requiredEnv {
		if os.Getenv(key) == "" {
			log.Fatalf("Environment variable %s not set", key)
		}
	}
}

func main() {
	models.ConnectDatabase()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	setupRoutes(router)

	router.Run("localhost:8080")
}

func setupRoutes(router *gin.Engine) {
	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)

	router.GET("/users", controllers.GetUsers)
	router.GET("/users/:id", controllers.GetUserByID)
	router.POST("/users", controllers.PostUsers)

	router.GET("/movies", controllers.GetMovies)
	router.GET("/shows", controllers.GetShows)

	router.POST("/seat", middlewares.JWTAuth(), controllers.PostSeatSelection)

	router.GET("/seats", controllers.GetBookedSeats)

	router.POST("/api/payment/initiate", middlewares.JWTAuth(), controllers.InitiatePayment)

	router.POST("/api/payment/success", controllers.PaymentSuccess)
	router.POST("/api/payment/failure", controllers.PaymentFailure)

	protected := router.Group("/")
	protected.Use(middlewares.JWTAuth())
	protected.GET("/profile", controllers.Profile)
	protected.POST("/review", controllers.PostReview)
}
