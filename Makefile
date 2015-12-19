all: clean
	# Rebuild pages
	~/go/bin/hugo --verbose

preview:
	# Launch local server to preview pages (with auto refresh)
	~/go/bin/hugo server --verbose --watch

clean:
	# Delete local build
	rm -rf public

deploy:
	# Deploy site to heroku
	s3cmd sync --acl-public --delete-removed public/ s3://joseph-hopper.com

push:
	# Push to github
	git push
