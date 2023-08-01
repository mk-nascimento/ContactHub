.PHONY: help node-version install dev deploy

NPM := npm
PROJECT := fullstack-challenge__backend
SRC = src/

help:
	@echo "Usage: make [command]"
	@echo ""
	@echo "Available commands:"
	@echo "  node-version     Show active node and npm versions"
	@echo "  install          Install dependencies"
	@echo "  build            Build application"
	@echo "  deploy           Deploy projet on prod"
	@echo "  dev              Run the development server"
	@echo "  help             Show this help message"

node-version:
	@echo "Versão do Node.js:"
	@node -v
	@echo "Versão do npm:"
	@$(NPM) -v

install:
	@$(NPM) install

build:
	@$(NPM) run build

deploy:
	make install
	make build

dev:
	@$(NPM) run dev