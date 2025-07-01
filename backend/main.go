package main

import (
	"log"
	"os"

	"backend/controllers"
	"backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	// Load local .env when present (for local dev)
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found. Using system environment variables.")
	}

	// These must be set (fatal if missing)
	requiredEnv := []string{
		"SECRET_KEY",
		"PAYU_MERCHANT_KEY",
		"PAYU_MERCHANT_SALT",
		"PAYU_BASE_URL",
		"DATABASE_URL", // <— add this
	}
	for _, key := range requiredEnv {
		if os.Getenv(key) == "" {
			log.Fatalf("Environment variable %s not set", key)
		}
	}
}

func main() {
	models.ConnectDatabase() // should read from DATABASE_URL

	router := gin.Default()

	// Public payment endpoints
	router.POST("/api/payment/success", controllers.PaymentSuccessHandler)
	router.POST("/api/payment/failure", controllers.PaymentFailureHandler)

	// CORS: allow both local dev and your deployed frontend
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",                      // your local React dev server
			"https://moviereservation-dr3g.onrender.com", // <— replace with your actual Render URL
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	setupRoutes(router)

	// Use Render’s PORT env var, listen on all interfaces
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // fallback for local dev
	}
	addr := "0.0.0.0:" + port
	log.Printf("Starting server on %s...", addr)
	router.Run(addr)
}

func setupRoutes(router *gin.Engine) {
	// ... your existing route definitions unchanged ...
}
