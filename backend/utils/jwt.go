package utils

import (
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("secret_key")

func GenerateJWT(username string) string {
	// signing algo - HMAC SHA-256
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		// custom claims in payload
		"username": username,
		"exp":      time.Now().Add(365 * 24 * time.Hour).Unix(),
	})
	tokenString, _ := token.SignedString(jwtKey)
	return tokenString
}

func ValidateJWT(tokenString string) (string, error) {
	// strip the bearer prefix
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	// parse, decode and validate the jwt including the claims (key lookup function)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil || !token.Valid {
		return "", err
	}

	// format of the claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", jwt.ErrTokenInvalidClaims
	}

	// extract username
	username, ok := claims["username"].(string)
	if !ok {
		return "", jwt.ErrTokenMalformed
	}

	return username, nil
}
