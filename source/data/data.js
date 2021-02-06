if (!localStorage.getItem("members") && !localStorage.getItem("eventList")) {
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
                    eventText: "Daily Standup",
                    eventId: "mondayTen"
                },
            },
            tuesday: {

            },
            wednesday: {

            },
            thursday: {
                thirteen: {
                    membersId: ["memberda7542bc41"],
                    eventText: "Planning session",
                    eventId: "thursdayThirteen"
                },
            },
            friday: {
                fourteen: {
                    membersId: ["memberda7542bc41"],
                    eventText: "Retrospective",
                    eventId: "fridayFourteen"
                },
            },
        };

        const membersJSON = JSON.stringify(members);
        const eventListJSON = JSON.stringify(eventList);
        localStorage.setItem("members", membersJSON);
        localStorage.setItem("eventList", eventListJSON);
    }