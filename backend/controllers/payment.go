package controllers

import (
	"backend/models"
	"crypto/sha512"
	"encoding/hex"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

type PaymentRequest struct {
	Amount float64 `json:"amount"`
	ShowID int     `json:"show_id"`
	Seats  string  `json:"seats"`
}

func GenerateTransactionID() string {
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("TXN%v", rand.Intn(100000000))
}

func GenerateHash(data string) string {
	hash := sha512.New()
	hash.Write([]byte(data))
	return hex.EncodeToString(hash.Sum(nil))
}

func InitiatePayment(c *gin.Context) {
	// Get username from context
	usernameRaw, exists := c.Get("username")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}
	username := usernameRaw.(string)

	// Find user by name (since you use "Name" not "Username")
	// var user models.User
	// if err := models.DB.Where("name = ?", username).First(&user).Error; err != nil {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
	// 	return
	// }
	var user models.User
	if err := models.DB.Where("email = ?", username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	var request PaymentRequest
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
		return
	}

	merchantKey := os.Getenv("PAYU_MERCHANT_KEY")
	merchantSalt := os.Getenv("PAYU_MERCHANT_SALT")
	payuBaseURL := os.Getenv("PAYU_BASE_URL")

	if merchantKey == "" || merchantSalt == "" || payuBaseURL == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "PayU configuration missing"})
		return
	}

	transactionID := GenerateTransactionID()
	amount := fmt.Sprintf("%.2f", request.Amount)
	productInfo := "MovieTickets"
	firstName := user.Name
	email := user.Email
	phone := "9999999999"
	successURL := "http://localhost:5173/payment-success"
	failureURL := "http://localhost:5173/payment-failure"

	hashString := fmt.Sprintf("%s|%s|%s|%s|%s|%s|||||||||||%s",
		merchantKey,
		transactionID,
		amount,
		productInfo,
		firstName,
		email,
		merchantSalt,
	)
	hash := GenerateHash(hashString)

	payuForm := fmt.Sprintf(`
		<form id="payuForm" method="post" action="%s/_payment">
			<input type="hidden" name="key" value="%s" />
			<input type="hidden" name="txnid" value="%s" />
			<input type="hidden" name="amount" value="%s" />
			<input type="hidden" name="productinfo" value="%s" />
			<input type="hidden" name="firstname" value="%s" />
			<input type="hidden" name="email" value="%s" />
			<input type="hidden" name="phone" value="%s" />
			<input type="hidden" name="surl" value="%s" />
			<input type="hidden" name="furl" value="%s" />
			<input type="hidden" name="hash" value="%s" />
		</form>
		<script type="text/javascript">
			document.getElementById("payuForm").submit();
		</script>
	`, payuBaseURL, merchantKey, transactionID, amount, productInfo, firstName, email, phone, successURL, failureURL, hash)

	c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(payuForm))
}

func PaymentSuccess(c *gin.Context) {
	txnid := c.PostForm("txnid")

	if err := models.DB.Model(&models.Booking{}).Where("txn_id = ?", txnid).
		Update("status", "success").Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update booking"})
		return
	}

	c.Redirect(http.StatusSeeOther, "http://localhost:5173/success")
}

func PaymentFailure(c *gin.Context) {
	txnid := c.PostForm("txnid")

	if err := models.DB.Model(&models.Booking{}).Where("txn_id = ?", txnid).
		Update("status", "failure").Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update booking"})
		return
	}

	c.Redirect(http.StatusSeeOther, "http://localhost:5173/failure")
}
