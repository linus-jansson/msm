package containers

type Container struct {
	ID     string `json:"id"`
	Image  string `json:"image"`
	Status string `json:"status"`
}

type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}
