NAME=spotify-renotifier
DOMAIN=namey5

.PHONY: all install clean

all: dist/extension.js

node_modules: package.json
	npm install

dist/extension.js: node_modules
	tsc

install: dist/extension.js
	@cp metadata.json dist/
	@touch ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)
	@rm -rf ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)
	@mv dist ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)

clean:
	@rm -rf dist node_modules
