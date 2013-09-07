SHELL := /bin/bash

clean:
	rm dist.zip
	rm -Rf dist/

define DIST_FILES
	assets/img/icon-128.png
	css
	js
	manifest.json
endef
export DIST_FILES

dist:
	mkdir -p dist
	rsync \
		--archive \
		--copy-links \
		--relative \
		--recursive \
		--files-from=<(echo "$$DIST_FILES" | sed 's/^\t//g') \
		--itemize-changes \
		. dist
	cd dist; zip -r dist.zip ./*

fat-pull:
	./_make/fat-pull

.PHONY: clean dist fat-pull
