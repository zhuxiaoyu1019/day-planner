var currentTime = moment().format('h');
var arr = $("textarea");


//change textarea background color based on current time
function trackTime() {
    if (currentTime >= 1 && currentTime <= 5) {
        currentTime = parseInt(currentTime);
        currentTime += 12;
    }
    for (var i = 0; i < arr.length; i++) {
        if (parseInt(currentTime) > parseInt($(arr[i]).attr("data-hour"))) {
            arr[i].parentElement.classList.remove("future");
            arr[i].parentElement.classList.remove("present");
            arr[i].parentElement.classList.add("past");
        } else if (parseInt(currentTime) === parseInt($(arr[i]).attr("data-hour"))) {
            arr[i].parentElement.classList.remove("future");
            arr[i].parentElement.classList.remove("past");
            arr[i].parentElement.classList.add("present");
        }
    }
}

//save input to the local storage
function setSchedule(e, time, note) {
    e.preventDefault();
    var list;
    if (localStorage.getItem("schedules") === null) {
        list = [{ time: time, note: note }];
    } else {
        list = JSON.parse(localStorage.getItem("schedules"));
        list.push({ time: time, note: note });
    }
    localStorage.setItem("schedules", JSON.stringify(list));
}

//display data in local storage
function displaySchedule() {
    var arr = JSON.parse(localStorage.getItem("schedules"));
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            $("textarea").filter(`[data-hour="${arr[i].time}"]`)[0].innerText = arr[i].note;
        }
    }

}


$("#currentDay").append(moment().format('dddd, MMMM Do'));
setInterval(trackTime, 1);
displaySchedule();
$(".saveBtn").click(function (e) {
    if ($(this.previousElementSibling).val() !== "") {
        setSchedule(e, $(this.previousElementSibling).attr("data-hour"), $(this.previousElementSibling).val());
    }
});