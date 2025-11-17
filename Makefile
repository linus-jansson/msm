BIN_DIR := bin
TARGET := $(BIN_DIR)/msm-api
SRC_DIR := ./backend

.PHONY: all build clean

all: build

build:
	mkdir -p $(BIN_DIR)
	cd $(SRC_DIR) && CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o ../$(TARGET) ./cmd/api

clean:
	rm -rf $(BIN_DIR)