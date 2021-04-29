from flask import Flask, render_template, request, jsonify
from ics import Calendar, Event
from arrow import Arrow

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


def date_from_str(input: str):
    """ Calculates an arrow date given a string `input` in m/d/y notation. """
    m, d, y = map(int, input.split("/"))
    return Arrow(y, m, d)


@app.route("/")
def index():
    # TODO: make the fetching faster.  Currently spends 2-3 seconds before page load
    deadlines, announcements = (s.get_all_records()
                                for s in SPREADSHEETS.worksheets()[:2])
    # from https://daringfireball.net/2010/07/improved_regex_for_matching_urls
    url_regex = re.compile(
        r"""(?i)\b((?:[a-z][\w-]+:(?:/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))""")
    # from https://stackoverflow.com/questions/42407785/regex-extract-email-from-strings
    email_regex = re.compile(
        r"([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)")
    # modify announcements
    announcements = [{
        **a,
        # show "3 days ago" instead of a date, for example
        "date": date_from_str(a["date"]).humanize(),
        # activate links and then make emails clickable
        "description":
        email_regex.sub(
            "<a href='mailto:\g<0>' target='_blank' rel='noopener noreferrer' class='typography--link'>\g<0></a>",
            url_regex.sub(
                "<a href='\g<0>' target='_blank' rel='noopener noreferrer' class='typography--link'>\g<0></a>",
                a["description"]))}
        for a in announcements]
    # modify deadlines
    deadlines = [{
        **d,
        # activate links and then make emails clickable
        "description":
        email_regex.sub(
            "<a href='mailto:\g<0>' target='_blank' rel='noopener noreferrer' class='typography--link'>\g<0></a>",
            url_regex.sub(
                "<a href='\g<0>' target='_blank' rel='noopener noreferrer' class='typography--link'>\g<0></a>",
                d["description"]))}
        for d in deadlines]

    return render_template("home.html",
                           deadlines=deadlines,
                           announcements=announcements)


@app.route("/api/v1/deadline/<id>")
def get_deadline_by_id(id):
    """ Returns an iCal calendar event that matches the deadline with the specified id. """
    deadlines = SPREADSHEETS.worksheet("Deadlines").get_all_records()
    for deadline in deadlines:
        if deadline["id"] == id:
            calendar = Calendar()
            event = Event()
            event.name = deadline["title"]
            event.description = deadline["description"]
            event.begin = date_from_str(deadline["due_date"])
            event.make_all_day()
            calendar.events.add(event)
            return str(calendar)


@app.route("/api/v1/deadlines")
def get_deadlines():
    deadlines = SPREADSHEETS.worksheet("Deadlines").get_all_records()
    calendar = Calendar()
    for deadline in deadlines:
        event = Event()
        event.name = deadline["title"]
        event.description = deadline["description"]
        event.begin = event.begin = date_from_str(deadline["due_date"])
        event.make_all_day()
        calendar.events.add(event)
    return str(calendar)


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
        form_results = request.get_json()
        email = form_results["email"]
        subject = form_results["subject"]
        message = form_results["message"]
        # write to spreadsheet
        contact = SPREADSHEETS.worksheet("Contact Form Entries")
        contact.append_row([email, subject, message])
        return jsonify(success=True)
    else:
        return render_template("contact.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
