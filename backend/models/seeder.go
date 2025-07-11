package models

import (
	"log"
	"os"

	"golang.org/x/crypto/bcrypt"
)

func SeedAdminUsers() {
	users := []User{
		{
			Name:    "Admin One",
			Email:   "a1@gmail.com",
			IsAdmin: true,
		},
	}

	var password = []byte(os.Getenv("ADMIN_PASSWORD"))

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Failed to hash password: %v", err)
	}

	for _, user := range users {
		var count int64
		DB.Model(&User{}).Where("email = ?", user.Email).Count(&count)
		if count > 0 {
			log.Printf("User %s already exists, skipping...", user.Email)
			continue
		}

		user.PasswordHash = string(hashedPassword)

		if err := DB.Create(&user).Error; err != nil {
			log.Fatalf("Failed to create user %s: %v", user.Email, err)
		}

		log.Printf("Created admin user: %s (email: %s)", user.Name, user.Email)
	}

	log.Println("Admin user seeding completed successfully.")
}
