import os
import simplejson

DATA_PATH = "web/data"
FILES_SUBDIR = "Files"
DATA_JSON = "data.json"
FIELDS = ['files', 'subtitle', 'description',
          'author', 'quote', 'title', 'year']

authors = os.walk(DATA_PATH).next()[1]


def process_folder(author, filename):
    base_path = os.path.join(DATA_PATH, author, filename)
    path = os.path.join(base_path, DATA_JSON)
    try:

        with open(path, "r") as f:
            d = simplejson.load(f)
            for field in FIELDS:
                if field not in d:
                    d[field] = ""

            if isinstance(d["files"], list) is False or len(d["files"]) < 1:
                print "No files in " + filename
                return None

            for f in d["files"]:
                print "Before", f["path"]
                f["path"] = os.path.join("data", author, filename, f["path"])
                print "After", f["path"]
            return d

    except IOError:
        print "WARNING: " + filename + " does not exist for " + author


def process_author(author):
    d_author = {}
    d_author["name"] = author
    d_author["files"] = []
    for folder in os.listdir(os.path.join(DATA_PATH, author)):
        print author, folder
        d = process_folder(author, folder)
        if d is not None:
            d_author["files"].append(d)

    return d_author

if __name__ == "__main__":
    d_full = {}
    for author in authors:
        author_json = process_author(author)

        d_full[author] = author_json

    with open("web/joseph_hoppers.json", "w") as out:
        simplejson.dump(d_full, out)
