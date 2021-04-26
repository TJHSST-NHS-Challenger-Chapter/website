# TODO Redirect page requests to serve the actual pages.
# TODO Create API endpoints for facebook and google classroom announcements.

from flask import Flask, render_template, request

import gspread
import re
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
    deadlines, announcements, contact = (
        s.get_all_records() for s in SPREADSHEETS.worksheets())
    # from https://daringfireball.net/2010/07/improved_regex_for_matching_urls
    url_regex = re.compile(
        r"""(?i)\b((?:[a-z][\w-]+:(?:/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))""")
    # from https://stackoverflow.com/questions/42407785/regex-extract-email-from-strings
    email_regex = re.compile(
        r"([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)")
    # activate links and then make emails clickable
    announcements = [{
        **a, "description":
        email_regex.sub(
            "<a href='mailto:\g<0>' target='_blank' rel='noopener noreferrer' class='typography--link'>\g<0></a>",
            url_regex.sub(
                "<a href='\g<0>' target='_blank' rel='noopener noreferrer' class='typography--link'>\g<0></a>",
                a["description"]))}
        for a in announcements]

    return render_template("home.html",
                           deadlines=deadlines,
                           announcements=announcements)


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
