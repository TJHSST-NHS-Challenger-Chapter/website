# TODO Redirect page requests to serve the actual pages.
# TODO Create API endpoints for facebook and google classroom announcements.

from flask import Flask, render_template, request

import gspread
from oauth2client.service_account import ServiceAccountCredentials

credential = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive"])
client = gspread.authorize(credential)
SPREADSHEETS = client.open("Website database")

app = Flask(
    __name__,
    template_folder="./frontend/src/templates",
    static_folder="frontend/build"
)


@app.route("/")
def index():
    # TODO: make the fetching faster.  Currently spends 2-3 seconds before page load
    deadlines, announcements, contact = SPREADSHEETS.worksheets()
    print("announcements", announcements.get_all_records())
    print("deadlines", deadlines.get_all_records())
    return render_template("home.html",
                           deadlines=deadlines.get_all_records(),
                           announcements=announcements.get_all_records())


# @app.route("/api/v1/deadlines/<id>")
# def get_deadline_by_id(id):
#     """ Returns an iCal calendar event that matches the deadline with the specified id. """
#     # TODO: The google sheets api allows us to specify the format of the date when we're reading it.  https://developers.google.com/sheets/api/guides/formats.  We should use this.
#     for deadline in fake_deadlines:
#         if deadline["id"] == id:
#             return deadline


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/service")
def service():
    return render_template("service.html")


@app.route("/faq")
def faq():
    return render_template("faq.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    # handle contact form submission
    if request.method == "POST":
        subject = request.form.get("subject")
        message = request.form.get("message")
        # TODO: send email
        print(subject, message)
        return render_template("contact.html", message=True)
    else:
        return render_template("contact.html", message=False)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
