package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("secret_key")

func GenerateJWT(username string) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(30 * 24 * time.Hour).Unix(),
	})
	tokenString, _ := token.SignedString(jwtKey)
	return tokenString
}

func ValidateJWT(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		username, ok := claims["username"].(string)
		if !ok {
			return "", jwt.ErrTokenMalformed
		}
		return username, nil
	}
	return "", err
}
