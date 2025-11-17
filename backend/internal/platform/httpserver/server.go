package httpserver

import (
	"io"
	"net/http"

	"linus-jansson/msm/internal/containers"
)

type Server struct {
	handler http.Handler
	cleanup func() error
}

func New() (*Server, error) {
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

	return &Server{
		handler: mux,
		cleanup: func() error {
			if closer, ok := interface{}(dockerAPI).(io.Closer); ok {
				return closer.Close()
			}
			return nil
		},
	}, nil
}

func (s *Server) Handler() http.Handler {
	return s.handler
}

func (s *Server) Close() error {
	return s.cleanup()
}
