const members = [
    {
        name: "Petter",
        id: "memberda7542bc41"
    },
    {
        name: "Alice",
        id: "memberda7542bc412"
    },
    {
        name: "Bob",
        id: "memberda7542bc43"
    },
    {
        name: "Maria",
        id: "memberda7542bc44"
    },
    {
        name: "Alex",
        id: "memberda7542bc40"
    }

];


const eventList = {
    monday: {
        ten: {
            membersId: ["memberda7542bc41", "memberda7542bc412", "memberda7542bc44"],
            eventText: "Stand Up0",
            eventId: "mondayTen"
        },
    },
    tuesday: {
        eleven: {
            membersId: ["memberda7542bc412"],
            eventText: "Meeting1",
            eventId: "tuesdayEleven"
        },
    },
    wednesday: {
        twelve: {
            membersId: ["memberda7542bc43"],
            eventText: "Stand Up2",
            eventId: "wednesdayTwelve"
        },
    },
    thursday: {
        thirteen: {
            members: "Petter" ,
            membersId: "memberda7542bc41",
            eventText: "Stand Up3",
            eventId: "thursdayThirteen"
        },
    },
    friday: {
        fourteen: {
            members: "Petter" ,
            membersId: "memberda7542bc41",
            eventText: "Stand Up4",
            eventId: "fridayFourteen"
        },
    },
};






const onEventFilter = (eventDate, memberId) => {
    const evDiv = document.getElementById(eventDate.eventId);
    const evTd = evDiv.parentNode;
    //
    if (memberId && !eventDate.membersId.includes(memberId)) {
        console.log(memberId);
        const newDivId = evDiv.id;
        console.log(newDivId);
        evTd.removeChild(evDiv);
        //removing the event from eventList (eventDate)

        const newDiv = document.createElement("div");
        newDiv.id = newDivId;
        evTd.style.backgroundColor = "#fff";
        evTd.append(newDiv);
        return;

    }
    //
    if (!evDiv.innerText) {
        evTd.style.backgroundColor = "#B7EC65";

        const evText = document.createElement("span");
        evText.innerText = eventDate.eventText;

        const xImg = document.createElement("img");
        xImg.src = "../styles/svg/x.svg";
        xImg.alt = "X";
        xImg.onclick = (e) => {

            const newDivId = evDiv.id;
            evTd.removeChild(evDiv);
            //removing the event from eventList (eventDate)

            const newDiv = document.createElement("div");
            newDiv.id = newDivId;
            evTd.style.backgroundColor = "#fff";
            evTd.append(newDiv);

        };
        evDiv.prepend(evText, xImg);
    }
};


const getMemberEvents = (memberId) => {

    for (let eventDay in eventList) {
        for (let eventTime in eventList[eventDay]) {
                onEventFilter(eventList[eventDay][eventTime], memberId);
        }
    }
};

const getAllEvents = () => {

    for (let eventDay in eventList) {
        for (let eventTime in eventList[eventDay]) {
            onEventFilter(eventList[eventDay][eventTime]);
        }
    }

};

const membersSelect = document.getElementById("members-select");

for (let member of members) {
    let ops = document.createElement("option");
    ops.id = member.id;
    ops.value = member.id;
    ops.innerText = member.name;
    membersSelect.append(ops);
}

membersSelect.onchange = (e) => {
    console.log(e.target)
    if (e.target.value === "all-members") {
        console.log("all members");
        getAllEvents();
    } else {
        console.log("Current member is " + e.target.value);
        getMemberEvents(e.target.value);
    }

};



getAllEvents();
