document.addEventListener("DOMContentLoaded", function () {
    const eventForm = document.getElementById("event-form");
    const eventList = document.getElementById("event-list");
    const events = JSON.parse(localStorage.getItem("events")) || [];

    function saveEvents() {
        localStorage.setItem("events", JSON.stringify(events));
    }

    function renderEvents() {
        eventList.innerHTML = "";
        events.forEach((event, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${event.title} - ${event.date} ${event.time} 
                <button onclick="deleteEvent(${index})">❌</button>
                <button onclick="editEvent(${index})">✏️</button>`;
            eventList.appendChild(li);
        });
    }

    eventForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        
        events.push({ title, date, time });
        saveEvents();
        renderEvents();
        eventForm.reset();
    });

    window.deleteEvent = function (index) {
        events.splice(index, 1);
        saveEvents();
        renderEvents();
    };

    window.editEvent = function (index) {
        const event = events[index];
        document.getElementById("title").value = event.title;
        document.getElementById("date").value = event.date;
        document.getElementById("time").value = event.time;
        events.splice(index, 1);
        saveEvents();
        renderEvents();
    };

    renderEvents();
});
