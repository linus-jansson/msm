package containers

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
)

type HTTPHandler struct {
	svc *Service
}

func NewHTTPHandler(svc *Service) *HTTPHandler {
	return &HTTPHandler{svc: svc}
}

func (h *HTTPHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /api/containers", h.handleList)
}

func (h *HTTPHandler) handleList(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	containers, err := h.svc.List(ctx)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ErrorResponse{
			Error:   "internal_error",
			Message: "Failed to list containers",
		})
		// Todo : replace with dedicated logging
		log.Printf("error listing containers: %v", err)
		return
	}

	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(containers); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ErrorResponse{
			Error:   "encoding_error",
			Message: "Failed to encode response",
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(containers)
	w.Write(buf.Bytes())
}
