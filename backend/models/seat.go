package models

type SeatSelection struct {
	ID        uint   `json:"id" gorm:"primaryKey"`
	Username  string `json:"username" `
	Theatre   string `json:"theatre" binding:"required"`
	Seat      string `json:"seat" binding:"required"`
	Date      string `json:"date" binding:"required"`
	Price     string `json:"price" binding:"required"`
	Movie     string `json:"movie" binding:"required"`
	ShowTime  string `json:"show_time" binding:"required"`
	BarcodeID string `json:"barcode_id" binding:"required"`
}
