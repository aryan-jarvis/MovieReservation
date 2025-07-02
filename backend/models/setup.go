package models

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// dsn := "host=localhost user=goauthuser password=password dbname=auth_db port=5432 sslmode=disable"
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=require TimeZone=UTC",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	// dsn := "host=dpg-d1iba1ripnbc73beqntg-a.oregon-postgres.render.com user=moviedb_et2q_user password=2xHxOTQ40oy0KLVQiJPqf9VWK471619V dbname=moviedb_et2q port=5432 sslmode=require TimeZone=UTC"

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	database.AutoMigrate(&User{}, &Movie{}, &Show{}, &Review{}, &SeatSelection{}, &Booking{}, &Cinema{}, &Theatre{}, &Show_Admin{})
	DB = database

	SeedData()
}
