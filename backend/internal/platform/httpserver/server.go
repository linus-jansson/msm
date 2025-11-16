package httpserver

import (
	"net/http"

	"linus-jansson/msm/internal/containers"
)

func New() (http.Handler, error) {
	mux := http.NewServeMux()

	// Basic health endpoint
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})

	// Containers feature
	dockerAPI, err := containers.NewDockerAPI()
	if err != nil {
		return nil, err
	}

	svc := containers.NewService(dockerAPI)
	h := containers.NewHTTPHandler(svc)
	h.RegisterRoutes(mux)

	// Later:
	// images.NewHTTPHandler(...).RegisterRoutes(mux)
	// auth.NewHTTPHandler(...).RegisterRoutes(mux)

	return mux, nil
}
