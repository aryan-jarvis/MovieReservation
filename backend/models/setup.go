package models

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// dsn := "host=localhost user=goauthuser password=password dbname=auth_db port=5432 sslmode=disable"
	dsn := "postgresql://my_postgres_xskn_user:ly3nn56RUFaMFivJqGONAWYolmVrXD1J@dpg-d1hs9gje5dus739d40ig-a/my_postgres_xskn"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	database.AutoMigrate(&User{}, &Movie{}, &Show{}, &Review{}, &SeatSelection{}, &Booking{}, &Cinema{}, &Theatre{}, &Show_Admin{})
	DB = database

	SeedData()
}
