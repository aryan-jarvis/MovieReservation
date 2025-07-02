package models

func SeedData() {
	var count int64
	DB.Model(&Movie{}).Count(&count)
	if count > 0 {
		return
	}

	movies := []Movie{}

	for i := range movies {
		DB.Create(&movies[i])
	}

	shows := []Show{}

	for _, show := range shows {
		DB.Create(&show)
	}
}
