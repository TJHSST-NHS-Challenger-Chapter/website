# flask
from flask import Flask, render_template, request, jsonify
# iCal creation
from ics import Calendar, Event
from arrow import Arrow
# markdown rendering
from markdown import markdown
from mdx_gfm import GithubFlavoredMarkdownExtension
# google sheets integration
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


def date_from_str(input: str):
    """ Calculates an arrow date given a string `input` in m/d/y notation. """
    m, d, y = map(int, input.split("/"))
    return Arrow(y, m, d)


@app.route("/")
def index():
    deadlines = SPREADSHEETS.worksheet("Deadlines").get_all_records()
    announcements = SPREADSHEETS.worksheet("Announcements").get_all_records()
    return render_template(
        "home.html",
        deadlines=[{
            **d,
            # render Markdown in description
            "description": markdown(d["description"], extensions=[GithubFlavoredMarkdownExtension()])}
            for d in deadlines],
        announcements=[{
            **a,
            # show "3 days ago" instead of a date, for example
            "date": date_from_str(a["date"]).humanize(),
            # render Markdown in description
            "description": markdown(a["description"], extensions=[GithubFlavoredMarkdownExtension()])}
            for a in announcements])


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
