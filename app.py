# TODO Redirect page requests to serve the actual pages.
# TODO Create API endpoints for facebook and google classroom announcements.

from flask import Flask, render_template

app = Flask(
    __name__,
    template_folder="./frontend/src/templates",
    static_folder="frontend/build"
)

fake_deadlines = [{
    "title": "Assignment Name",
    "due_date": "12/1/2020",
    "description": "Description or additional information about the assignment.  Don’t put too much in here though (link to things like google classroom instead?)"
}, {
    "title": "Assignment Name 2",
    "due_date": "12/5/2020",
    "description": "Description or additional information about the assignment.  Don’t put too much in here though (link to things like google classroom instead?)"
}]

fake_announcements = [{
    "title": "Things are Due!",
    "date": "May 3, 2020",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    "link": None
}, {
    "title": "No More x2VOL!",
    "date": "May 3, 2020",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    "link": None
}, {
    "title": "Use Google Sheets",
    "date": "May 3, 2020",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    "link": "https://www.google.com"
}]

@app.route("/")
def index():
    # TODO: fetch classroom and facebook announcements on each HTTP request
    return render_template("home.html", deadlines=fake_deadlines, announcements=fake_announcements)

if __name__ == "__main__":
    app.run(debug=True)