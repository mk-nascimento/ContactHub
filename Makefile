.PHONY: help docker-dev docker-prod start-dev start-prod

include .env

APP_PORT ?= 3000
SERVER_DIR := backend
PROJECT := fullstack-challenge


all: help

help:
	@echo "Usage: make [command]"
	@echo ""
	@echo "Available commands:"
	@echo "  help                    Show this help message"
	@echo "  docker-dev              Run the development server"
	@echo "  docker-prod             Run the production server"
	@echo "  start-dev               Start the development server"
	@echo "  start-prod              Start the production server"

docker-dev:
	@docker compose up -d

docker-prod:
	@docker build -t $(PROJECT):prod -f backend/Dockerfile backend/
	@docker run -d --name $(PROJECT) -p $(APP_PORT):$(APP_PORT) --env-file .env $(PROJECT):prod

.install:
	@cd $(SERVER_DIR) && npm install

.prisma-deploy: .install
	@cd $(SERVER_DIR) && npm run prisma:prod

.prisma-dev: .install
	@cd $(SERVER_DIR) && npm run prisma:dev

start-dev: .prisma-dev
	@cd $(SERVER_DIR) && npm run start:dev

start-prod: .prisma-deploy
	@cd $(SERVER_DIR) && npm run start:prod
