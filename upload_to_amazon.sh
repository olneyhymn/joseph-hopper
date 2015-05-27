echo "Build site..."
python build-site/build-site.py
echo "Upload to S3..."
s3cmd sync --acl-public --delete-removed web/ s3://joseph-hopper.com
