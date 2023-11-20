.PHONY: help dcoker-serv server-dev server-prod client-dev

include backend/.env
include frontend/.env

PACKAGE_MANAGER := npm

APP_PORT ?= 3000
CLIENT_DIR := frontend
SERVER_DIR := backend
PROJECT := contacthub


all: help

help:
	@echo "Usage: make [command]"
	@echo ""
	@echo "Available commands:"
	@echo "  help            Show this help message"
	@echo "  docker-server   Run the development server on Docker"
	@echo "  server-dev      Run the development server"
	@echo "  server-prod     Run the production server"
	@echo "  client-dev      Run the development client"

.docker-server-build:
	@cd $(SERVER_DIR) && docker build --no-cache -t $(PROJECT)-$(SERVER_DIR) .

docker-server: .docker-server-build
	@docker run -it --rm --name $(SERVER_DIR) $(PROJECT)-$(SERVER_DIR)

.server-install:
	@cd $(SERVER_DIR) && $(PACKAGE_MANAGER) install

.prisma-prod: .server-install
	@cd $(SERVER_DIR) && $(PACKAGE_MANAGER) run prisma:prod

.prisma-dev: .server-install
	@cd $(SERVER_DIR) && $(PACKAGE_MANAGER) run prisma:dev

server-dev: .prisma-dev
	@cd $(SERVER_DIR) && $(PACKAGE_MANAGER) run start:dev

server-prod: .prisma-prod
	@cd $(SERVER_DIR) && $(PACKAGE_MANAGER) run start:prod

.client-install:
	@cd $(SERVER_DIR) && $(PACKAGE_MANAGER) install

client-dev: .client-install
	@cd $(SERVER_DIR) && $(PACKAGE_MANAGER) run dev