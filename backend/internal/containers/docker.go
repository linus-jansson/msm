package containers

import (
	"context"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
)

type DockerAPI struct {
	cli *client.Client
}

func NewDockerAPI() (*DockerAPI, error) {
	c, err := client.NewClientWithOpts(
		client.FromEnv,
		client.WithAPIVersionNegotiation(),
	)
	if err != nil {
		return nil, err
	}
	return &DockerAPI{cli: c}, nil
}

func (d *DockerAPI) ListContainers(ctx context.Context) ([]Container, error) {
	cs, err := d.cli.ContainerList(ctx, container.ListOptions{All: true})
	// cs, err := d.cli.ContainerList(ctx, types.ContainerListOptions{All: true})
	if err != nil {
		return nil, err
	}

	out := make([]Container, 0, len(cs))
	for _, c := range cs {
		out = append(out, Container{
			ID:     c.ID,
			Image:  c.Image,
			Status: c.Status,
		})
	}
	return out, nil
}
