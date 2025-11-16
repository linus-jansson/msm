package main

import (
	"fmt"
	"linus-jansson/msm/internals/docker"
	httpserver "linus-jansson/msm/internals/http"
	"log"
	"net/http"
	"time"
)

func main() {
	// entry point for http api
	docker.ListDockerContainers()
	fmt.Println("Hello world")

	handler := httpserver.New()

	srv := &http.Server{
		Addr:         ":8080",
		Handler:      handler,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	log.Println("HTTP server listening on :8080")
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
