package main

import (
	"log"
	"net/http"

	"linus-jansson/msm/internal/platform/httpserver"
)

func main() {
	handler, err := httpserver.New()
	if err != nil {
		log.Fatal(err)
	}

	log.Println("API server running on :8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal(err)
	}
}
