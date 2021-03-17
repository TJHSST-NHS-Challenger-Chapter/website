# TODO Redirect page requests to serve the actual pages.
# TODO Create API endpoints for facebook and google classroom announcements.

from flask import Flask, render_template
from datetime import datetime

app = Flask(
    __name__,
    template_folder="./frontend/src/templates",
    static_folder="frontend/build"
)

fake_deadlines = [{
    # UUID, or Universally Unique IDentifier
    "id": "b4f513ad-ef15-4a86-920d-b844f435a90c",
    "title": "Assignment Name",
    # Unix Epoch, or seconds since Jan 1 1970
    "due_date": "1615594637",
    "description": "Description or additional information about the assignment.  Don’t put too much in here though (link to things like google classroom instead?)"
}, {
    "id": "4bc7cb92-1cba-4eb8-a400-2cbf5eaa8162",
    "title": "Assignment Name 2",
    "due_date": "1615594658",
    "description": "Description or additional information about the assignment.  Don’t put too much in here though (link to things like google classroom instead?)"
}, {
    "id": "44db5396-fb12-4d09-b88a-49702d3e37fb",
    "title": "Assignment Name 2",
    "due_date": "1615594674",
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

    # turn Unix Epoch into mm/dd/yyyy before sending back
    deadlines_with_readable_date = list()
    for deadline in fake_deadlines:
        copy = deadline.copy()
        copy["due_date"] = datetime.fromtimestamp(
            int(copy["due_date"])).strftime("%-m/%-d/%Y")
        deadlines_with_readable_date.append(copy)
    return render_template("home.html",
                           deadlines=deadlines_with_readable_date,
                           announcements=fake_announcements)


@app.route("/api/v1/deadlines/<id>")
def get_deadline_by_id(id):
    """ Returns an iCal calendar event that matches the deadline with the specified id. """
    # TODO: The google sheets api allows us to specify the format of the date when we're reading it.  https://developers.google.com/sheets/api/guides/formats.  We should use this.
    for deadline in fake_deadlines:
        if deadline["id"] == id:
            return deadline


@app.route("/about/")
def about():
    return render_template("about.html")


@app.route("/service")
def service():
    return render_template("service.html")


@app.route("/faq")
def faq():
    return render_template("faq.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


if __name__ == "__main__":
    app.run(debug=True)
