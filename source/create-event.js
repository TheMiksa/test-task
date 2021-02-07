
const onEventCreate = () => {
    let eventText = document.getElementById("event-text");


    const onEventCreateProblem = (tipText, problemElements) => {
        const nameTip = document.createElement("span");
        nameTip.id = "eventTip";
        nameTip.innerText = tipText;
        nameTip.style.position = "absolute";
        nameTip.style.right = "2px";
        nameTip.style.top = "-25px";
        nameTip.style.color = "tomato";
        if (problemElements.length > 1) {
            document.querySelector(".option-box-day").append(nameTip);

            problemElements[0].style.border = "1px solid tomato";
            problemElements[1].style.border = "1px solid tomato";
        } else {
            document.querySelector(".option-box").prepend(nameTip);
            problemElements[0].placeholder = "Event name";
            problemElements[0].style.border = "1px solid tomato";
        }
    }
    if (!eventText.value) {
        onEventCreateProblem("Please enter the event name", [eventText]);
        return;
    }

    eventText = eventText.value;
    const eventMembers = document.getElementById("event-members").value;
    const eventDay = document.getElementById("event-day").value;
    const eventTime = document.getElementById("event-time").value;

    const eventList = JSON.parse(localStorage.getItem("eventList"));
    const members = JSON.parse(localStorage.getItem("members"));

    const untestedNewEvent = eventList[eventDay][eventTime];
    if (untestedNewEvent && Object.keys(untestedNewEvent).length) {
        const eventDate = [
            document.getElementById("event-day"),
            document.getElementById("event-time")
        ];
        onEventCreateProblem("Sorry, this slot is already taken", eventDate);
    }
    else if (!untestedNewEvent || untestedNewEvent && !Object.keys(untestedNewEvent)) {

        const newEventList = Object.assign({}, eventList);
        const eventId = eventDay + eventTime[0].toUpperCase() + eventTime.slice(1);

        let membersId = [];
        if (eventMembers === "all") {
            for (let member in members) {
                membersId[membersId.length] = members[member].id;
            }
        } else membersId = [eventMembers];

        const newEvent = {
          membersId,
          eventText,
          eventId
        };
        newEventList[eventDay][eventTime] = newEvent;
        localStorage.setItem("eventList", JSON.stringify(newEventList));

        return true;
    }


};

const hasValue = ({target}) => {
    if (target.value.length === 1) {
        target.style.border = "1px solid darkgray";
        const eventTiP = document.getElementById("eventTip");
        if (eventTiP) eventTiP.remove();
    }
};


const btnCreateEvent = document.getElementById("btn-create-event");
const inputEventName = document.getElementById("event-text");
const selectEventDay = document.getElementById("event-day");
const selectEventTime = document.getElementById("event-time");

const onChangeDate = () => {
    selectEventDay.style.border = "1px solid darkgray";
    selectEventTime.style.border = "1px solid darkgray";
    const eventTiP = document.getElementById("eventTip");
    if (eventTiP) eventTiP.remove();
}
selectEventDay.onchange = onChangeDate;
selectEventTime.onchange = onChangeDate;

btnCreateEvent.onclick = () => {
    if (onEventCreate()) document.location.href = "calendar.html";
};
inputEventName.oninput = hasValue;