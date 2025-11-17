############################
# Build
############################
FROM golang:1.24.5-alpine AS builder
WORKDIR /src
ENV CGO_ENABLED=0

COPY backend/go.mod backend/go.sum ./backend/
RUN --mount=type=cache,target=/go/pkg/mod cd backend && go mod download

COPY backend ./backend
RUN cd backend && go build -ldflags="-s -w" -o /out/msm-api ./cmd/api

############################
# Runtime
############################
FROM alpine:3.21 AS runner
WORKDIR /app

RUN apk add --no-cache ca-certificates

COPY --from=builder /out/msm-api /usr/local/bin/msm-api

EXPOSE 8080
ENV API_PORT=8080

CMD ["msm-api"]
