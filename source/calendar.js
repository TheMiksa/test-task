const members = JSON.parse(localStorage.getItem("members"));
const eventList = JSON.parse(localStorage.getItem("eventList"));

//adding membersSelect
const membersSelect = document.getElementById("members-select");

for (let member of members) {
    let ops = document.createElement("option");
    ops.id = member.id;
    ops.value = member.id;
    ops.innerText = member.name;
    membersSelect.append(ops);
}

membersSelect.onchange = (e) => {
    if (e.target.value === "all-members") {
        getAllEvents();
    } else {
        getMemberEvents(e.target.value);
    }

};
//


const onEventFilter = (eventDate, memberId, eventDay, eventTime) => {
    const evDiv = document.getElementById(eventDate.eventId);
    const evTd = evDiv.parentNode;

    if (memberId && !eventDate.membersId.includes(memberId)) {
        const newDivId = evDiv.id;
        evTd.removeChild(evDiv);

        const newDiv = document.createElement("div");
        newDiv.id = newDivId;
        evTd.style.backgroundColor = "#fff";
        evTd.append(newDiv);
        return;

    }

    if (!evDiv.innerText) {
        evTd.style.backgroundColor = "#B7EC65";

        const evText = document.createElement("span");
        evText.innerText = eventDate.eventText;

        const deleteSymbol = document.createElement("span");
        deleteSymbol.innerHTML = "&times;";
        deleteSymbol.onclick = (e) => {
            const evRemoved = confirm(`Are you sure you want to delete ${evText.innerText} event?`);

            if (!evRemoved) return;

            const newEventList = Object.assign({}, eventList);
            delete newEventList[eventDay][eventTime];
            localStorage.setItem("eventList", JSON.stringify(newEventList));

            const newDivId = evDiv.id;
            evTd.removeChild(evDiv);

            const newDiv = document.createElement("div");
            newDiv.id = newDivId;
            evTd.style.backgroundColor = "#fff";
            evTd.append(newDiv);

        };
        evDiv.prepend(evText, deleteSymbol);
    }
};

const getMemberEvents = (memberId) => {
    for (let eventDay in eventList) {
        for (let eventTime in eventList[eventDay]) {
            onEventFilter(eventList[eventDay][eventTime], memberId, eventDay, eventTime);
        }
    }
};

const getAllEvents = () => {
    for (let eventDay in eventList) {
        for (let eventTime in eventList[eventDay]) {
            onEventFilter(eventList[eventDay][eventTime], null, eventDay, eventTime);
        }
    }
};


getAllEvents();
