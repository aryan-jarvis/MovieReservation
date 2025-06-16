package models

import (
	"log"
	"time"
)

func SeedData() {
	var count int64
	DB.Model(&Movie{}).Count(&count)
	if count > 0 {
		return
	}

	const sharedPosterURL = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQHHWqtRziF4Ne7mUK-oDGiwmuQhMKOKHrDm-gkUGto5wwXPbG5HLHBda8Urpix1X3E3CV7"

	movies := []Movie{
		{Name: "Chrono Drift", PosterURL: sharedPosterURL, DirectorName: "Elena Grayson", Duration: 132, ReleaseDate: time.Date(2022, 3, 12, 0, 0, 0, 0, time.UTC), Language: "English", Genre: "Sci-Fi", Certificate: "PG-13", AverageRating: 7.9, Description: "A rogue scientist manipulates time to prevent a global catastrophe."},
		{Name: "The Forgotten Signal", PosterURL: sharedPosterURL, DirectorName: "Jonas Richter", Duration: 115, ReleaseDate: time.Date(2018, 11, 5, 0, 0, 0, 0, time.UTC), Language: "German", Genre: "Thriller", Certificate: "R", AverageRating: 8.2, Description: "A cryptologist uncovers a message that could change history."},
		{Name: "Neon Veil", PosterURL: sharedPosterURL, DirectorName: "Claire Mendoza", Duration: 126, ReleaseDate: time.Date(2020, 6, 20, 0, 0, 0, 0, time.UTC), Language: "English", Genre: "Mystery", Certificate: "PG-13", AverageRating: 7.4, Description: "In a cyberpunk future, a detective hunts an AI that erases identities."},
		{Name: "Echoes of Mars", PosterURL: sharedPosterURL, DirectorName: "Markus Vale", Duration: 139, ReleaseDate: time.Date(2023, 8, 18, 0, 0, 0, 0, time.UTC), Language: "English", Genre: "Sci-Fi", Certificate: "PG", AverageRating: 8.6, Description: "Colonists on Mars encounter a strange signal buried beneath the soil."},
		{Name: "Dreamwire", PosterURL: sharedPosterURL, DirectorName: "Samantha Lau", Duration: 143, ReleaseDate: time.Date(2019, 2, 27, 0, 0, 0, 0, time.UTC), Language: "English", Genre: "Sci-Fi", Certificate: "PG-13", AverageRating: 8.1, Description: "A group of hackers discovers a way to influence dreams in the real world."},
		{Name: "Subsurface", PosterURL: sharedPosterURL, DirectorName: "Andre Beaumont", Duration: 119, ReleaseDate: time.Date(2017, 9, 14, 0, 0, 0, 0, time.UTC), Language: "French", Genre: "Thriller", Certificate: "R", AverageRating: 7.7, Description: "Divers uncover an underwater facility with a sinister secret."},
		{Name: "Memory Rift", PosterURL: sharedPosterURL, DirectorName: "Tariq Mansoor", Duration: 134, ReleaseDate: time.Date(2021, 4, 9, 0, 0, 0, 0, time.UTC), Language: "Hindi", Genre: "Drama", Certificate: "PG", AverageRating: 8.3, Description: "A man regains lost memories and unravels a decades-old mystery."},
		{Name: "Quantum Divide", PosterURL: sharedPosterURL, DirectorName: "Nina Harrow", Duration: 151, ReleaseDate: time.Date(2024, 1, 23, 0, 0, 0, 0, time.UTC), Language: "English", Genre: "Sci-Fi", Certificate: "PG-13", AverageRating: 9.1, Description: "Physicists test a machine that splits reality into infinite dimensions."},
		{Name: "Synthetic Eden", PosterURL: sharedPosterURL, DirectorName: "Victor Tanaka", Duration: 142, ReleaseDate: time.Date(2022, 12, 1, 0, 0, 0, 0, time.UTC), Language: "Japanese", Genre: "Sci-Fi", Certificate: "PG-13", AverageRating: 8.5, Description: "An android seeks freedom in a utopian society built on illusions."},
		{Name: "Silicon Rain", PosterURL: sharedPosterURL, DirectorName: "Lena Voss", Duration: 128, ReleaseDate: time.Date(2016, 5, 6, 0, 0, 0, 0, time.UTC), Language: "English", Genre: "Tech-Noir", Certificate: "R", AverageRating: 7.8, Description: "A cyberdetective races to stop a virus infecting human minds."},
		{Name: "The Labyrinth Protocol", PosterURL: sharedPosterURL, DirectorName: "George Ilyin", Duration: 137, ReleaseDate: time.Date(2015, 8, 19, 0, 0, 0, 0, time.UTC), Language: "Russian", Genre: "Action", Certificate: "PG-13", AverageRating: 8.0, Description: "A retired agent is pulled back into a world of espionage when his code resurfaces."},
		{Name: "Orbitfall", PosterURL: sharedPosterURL, DirectorName: "Isabelle Trent", Duration: 124, ReleaseDate: time.Date(2021, 10, 2, 0, 0, 0, 0, time.UTC), Language: "English", Genre: "Sci-Fi", Certificate: "PG", AverageRating: 7.5, Description: "After a satellite crash, a young astronaut discovers a world-changing anomaly."},
		{Name: "Fractal Minds", PosterURL: sharedPosterURL, DirectorName: "Ravi Kapoor", Duration: 145, ReleaseDate: time.Date(2023, 2, 16, 0, 0, 0, 0, time.UTC), Language: "English", Genre: "Psychological", Certificate: "R", AverageRating: 8.4, Description: "Five strangers realize they're sharing the same dream with deadly consequences."},
		{Name: "Lucid Engines", PosterURL: sharedPosterURL, DirectorName: "Kara Shields", Duration: 136, ReleaseDate: time.Date(2020, 1, 30, 0, 0, 0, 0, time.UTC), Language: "English", Genre: "Sci-Fi", Certificate: "PG-13", AverageRating: 8.2, Description: "Engineers develop a machine that lets users enter and reshape their own thoughts."},
		{Name: "Last Frequency", PosterURL: sharedPosterURL, DirectorName: "Miles Chen", Duration: 117, ReleaseDate: time.Date(2019, 7, 10, 0, 0, 0, 0, time.UTC), Language: "Mandarin", Genre: "Thriller", Certificate: "PG-13", AverageRating: 7.9, Description: "A late-night radio show receives a chilling transmission from an alternate Earth."},
		{Name: "Zero Parallax", PosterURL: sharedPosterURL, DirectorName: "Alessandra Ruiz", Duration: 130, ReleaseDate: time.Date(2025, 4, 1, 0, 0, 0, 0, time.UTC), Language: "Spanish", Genre: "Sci-Fi", Certificate: "PG", AverageRating: 8.7, Description: "Two realities collapse into one when a physicist breaks the parallax threshold."},
		{Name: "Neural Reign", PosterURL: sharedPosterURL, DirectorName: "Tomoko Yamada", Duration: 150, ReleaseDate: time.Date(2023, 11, 9, 0, 0, 0, 0, time.UTC), Language: "Japanese", Genre: "Tech-Thriller", Certificate: "R", AverageRating: 8.9, Description: "In a society controlled by thought-based AI, one rebel learns to mask his mind."},
		{Name: "Cognitive Storm", PosterURL: sharedPosterURL, DirectorName: "Beatrice Anders", Duration: 141, ReleaseDate: time.Date(2018, 3, 3, 0, 0, 0, 0, time.UTC), Language: "English", Genre: "Sci-Fi", Certificate: "PG-13", AverageRating: 8.0, Description: "A storm exposes people’s innermost thoughts as audio transmissions."},
		{Name: "Shadow Constructs", PosterURL: sharedPosterURL, DirectorName: "Darius Lee", Duration: 122, ReleaseDate: time.Date(2016, 12, 8, 0, 0, 0, 0, time.UTC), Language: "English", Genre: "Horror", Certificate: "R", AverageRating: 7.6, Description: "Entities born from fear begin to manifest physically in a small town."},
		{Name: "The Mind Archive", PosterURL: sharedPosterURL, DirectorName: "Fatima Zahra", Duration: 138, ReleaseDate: time.Date(2024, 6, 6, 0, 0, 0, 0, time.UTC), Language: "Arabic", Genre: "Sci-Fi", Certificate: "PG", AverageRating: 8.3, Description: "A data scientist uncovers memories of people long dead in the neural cloud."},
	}

	for i := range movies {
		DB.Create(&movies[i])
	}

	log.Println("Seeded movies")

	shows := []Show{
		{
			MovieID:    movies[1].ID,
			TheatreID:  101,
			TotalSeats: 100,
			StartTime:  time.Now().Add(24 * time.Hour),
			EndTime:    time.Now().Add(26 * time.Hour),
			Price:      12.50,
			Duration:   movies[1].Duration,
		},
		{
			MovieID:    movies[2].ID,
			TheatreID:  102,
			TotalSeats: 100,
			StartTime:  time.Now().Add(26 * time.Hour),
			EndTime:    time.Now().Add(28 * time.Hour),
			Price:      11.50,
			Duration:   movies[2].Duration,
		},
		{
			MovieID:    movies[3].ID,
			TheatreID:  103,
			TotalSeats: 120,
			StartTime:  time.Now().Add(28 * time.Hour),
			EndTime:    time.Now().Add(30 * time.Hour),
			Price:      10.00,
			Duration:   movies[3].Duration,
		},
		{
			MovieID:    movies[4].ID,
			TheatreID:  104,
			TotalSeats: 110,
			StartTime:  time.Now().Add(30 * time.Hour),
			EndTime:    time.Now().Add(32 * time.Hour),
			Price:      9.50,
			Duration:   movies[4].Duration,
		},
		{
			MovieID:    movies[5].ID,
			TheatreID:  105,
			TotalSeats: 130,
			StartTime:  time.Now().Add(32 * time.Hour),
			EndTime:    time.Now().Add(34 * time.Hour),
			Price:      10.75,
			Duration:   movies[5].Duration,
		},
		{
			MovieID:    movies[6].ID,
			TheatreID:  106,
			TotalSeats: 140,
			StartTime:  time.Now().Add(34 * time.Hour),
			EndTime:    time.Now().Add(36 * time.Hour),
			Price:      13.00,
			Duration:   movies[6].Duration,
		},
		{
			MovieID:    movies[7].ID,
			TheatreID:  107,
			TotalSeats: 90,
			StartTime:  time.Now().Add(36 * time.Hour),
			EndTime:    time.Now().Add(38 * time.Hour),
			Price:      9.00,
			Duration:   movies[7].Duration,
		},
		{
			MovieID:    movies[8].ID,
			TheatreID:  108,
			TotalSeats: 85,
			StartTime:  time.Now().Add(38 * time.Hour),
			EndTime:    time.Now().Add(40 * time.Hour),
			Price:      8.50,
			Duration:   movies[8].Duration,
		},
		{
			MovieID:    movies[9].ID,
			TheatreID:  109,
			TotalSeats: 100,
			StartTime:  time.Now().Add(40 * time.Hour),
			EndTime:    time.Now().Add(42 * time.Hour),
			Price:      12.00,
			Duration:   movies[9].Duration,
		},
		{
			MovieID:    movies[10].ID,
			TheatreID:  110,
			TotalSeats: 100,
			StartTime:  time.Now().Add(42 * time.Hour),
			EndTime:    time.Now().Add(44 * time.Hour),
			Price:      11.20,
			Duration:   movies[10].Duration,
		},
		{
			MovieID:    movies[11].ID,
			TheatreID:  111,
			TotalSeats: 95,
			StartTime:  time.Now().Add(44 * time.Hour),
			EndTime:    time.Now().Add(46 * time.Hour),
			Price:      10.80,
			Duration:   movies[11].Duration,
		},
		{
			MovieID:    movies[12].ID,
			TheatreID:  112,
			TotalSeats: 105,
			StartTime:  time.Now().Add(46 * time.Hour),
			EndTime:    time.Now().Add(48 * time.Hour),
			Price:      11.75,
			Duration:   movies[12].Duration,
		},
		{
			MovieID:    movies[13].ID,
			TheatreID:  113,
			TotalSeats: 125,
			StartTime:  time.Now().Add(48 * time.Hour),
			EndTime:    time.Now().Add(50 * time.Hour),
			Price:      13.25,
			Duration:   movies[13].Duration,
		},
		{
			MovieID:    movies[14].ID,
			TheatreID:  114,
			TotalSeats: 100,
			StartTime:  time.Now().Add(50 * time.Hour),
			EndTime:    time.Now().Add(52 * time.Hour),
			Price:      9.99,
			Duration:   movies[14].Duration,
		},
		{
			MovieID:    movies[15].ID,
			TheatreID:  115,
			TotalSeats: 130,
			StartTime:  time.Now().Add(52 * time.Hour),
			EndTime:    time.Now().Add(54 * time.Hour),
			Price:      10.10,
			Duration:   movies[15].Duration,
		},
		{
			MovieID:    movies[16].ID,
			TheatreID:  116,
			TotalSeats: 120,
			StartTime:  time.Now().Add(54 * time.Hour),
			EndTime:    time.Now().Add(56 * time.Hour),
			Price:      10.25,
			Duration:   movies[16].Duration,
		},
		{
			MovieID:    movies[17].ID,
			TheatreID:  117,
			TotalSeats: 110,
			StartTime:  time.Now().Add(56 * time.Hour),
			EndTime:    time.Now().Add(58 * time.Hour),
			Price:      11.35,
			Duration:   movies[17].Duration,
		},
		{
			MovieID:    movies[18].ID,
			TheatreID:  118,
			TotalSeats: 140,
			StartTime:  time.Now().Add(58 * time.Hour),
			EndTime:    time.Now().Add(60 * time.Hour),
			Price:      13.60,
			Duration:   movies[18].Duration,
		},
		{
			MovieID:    movies[19].ID,
			TheatreID:  119,
			TotalSeats: 100,
			StartTime:  time.Now().Add(60 * time.Hour),
			EndTime:    time.Now().Add(62 * time.Hour),
			Price:      12.10,
			Duration:   movies[19].Duration,
		},
	}

	for _, show := range shows {
		DB.Create(&show)
	}

	log.Println("Seeded shows")
}
