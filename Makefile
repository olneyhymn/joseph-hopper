all: clean
	# Rebuild pages
	~/go/bin/hugo --verbose

preview: clean
	# Launch local server to preview pages (with auto refresh)
	~/go/bin/hugo server --verbose --watch

clean:
	# Delete local build
	rm -rf public

deploy: all
	# Deploy site to S3
	s3cmd sync --acl-public --delete-removed public/ s3://joseph-hopper.com
	$(warning Consider running `make archive`)

push:
	# Push to github
	git push

archive:
	# Archive data files (not on github)
	zip -r -9 ~/Dropbox/jhopper-archives/joseph-hopper-data-`date +%Y%m%d`.zip static/data/

check_links:
	# Find broken links
	wget --spider -o ~/wget.log -e robots=off -w 1 -r -p http://joseph-hopper.com