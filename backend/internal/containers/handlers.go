package containers

import (
	"encoding/json"
	"net/http"
)

type HTTPHandler struct {
	svc *Service
}

func NewHTTPHandler(svc *Service) *HTTPHandler {
	return &HTTPHandler{svc: svc}
}

func (h *HTTPHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/containers", h.handleList)
}

func (h *HTTPHandler) handleList(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	containers, err := h.svc.List(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(containers)
}
