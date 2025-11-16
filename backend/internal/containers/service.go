package containers

import "context"

type DockerClient interface {
	ListContainers(ctx context.Context) ([]Container, error)
}

type Service struct {
	docker DockerClient
}

func NewService(dc DockerClient) *Service {
	return &Service{docker: dc}
}

func (s *Service) List(ctx context.Context) ([]Container, error) {
	return s.docker.ListContainers(ctx)
}
