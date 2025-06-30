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

	router.POST("/api/payment/success", controllers.PaymentSuccessHandler)
	router.POST("/api/payment/failure", controllers.PaymentFailureHandler)

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
	router.PUT("/users/:name", controllers.UpdateUserByName)

	router.GET("/movies", controllers.GetMovies)
	router.GET("/shows", controllers.GetShows)

	router.POST("/seat", middlewares.JWTAuth(), controllers.PostSeatSelection)

	router.GET("/seats", controllers.GetBookedSeats)

	router.POST("/api/payment/initiate", middlewares.JWTAuth(), controllers.InitiatePayment)

	router.GET("/cinemas", controllers.GetCinemas)
	router.POST("/cinemas", controllers.PostCinema)
	router.PUT("/cinemas/:id", controllers.UpdateCinema)
	router.DELETE("/cinemas/:id", controllers.DeleteCinema)
	router.GET("/cinemas/:id", controllers.GetCinemaByID)

	router.GET("/theatres", controllers.GetTheatres)
	router.POST("/theatres", controllers.PostTheatre)
	router.PUT("/theatres/:id", controllers.UpdateTheatre)
	router.DELETE("/theatres/:id", controllers.DeleteTheatre)
	router.GET("/theatres/:id", controllers.GetTheatreByID)

	router.GET("/showAdmin", controllers.GetShowAdmin)
	router.POST("/showAdmin", controllers.PostShowAdmin)
	router.PUT("/showAdmin/:id", controllers.UpdateShowAdmin)
	router.DELETE("/showAdmin/:id", controllers.DeleteShowAdmin)
	router.GET("/showAdmin/:id", controllers.GetShowAdminByID)

	router.GET("/review", controllers.GetReview)

	protected := router.Group("/")
	protected.Use(middlewares.JWTAuth())
	protected.GET("/profile", controllers.Profile)
	protected.POST("/review", controllers.PostReview)
}
