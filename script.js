document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar');
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function updateCalendar(month, year) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month).getDay();

        let calendarHTML = '<table><tr>';
        for (let i = 0; i < daysInMonth; i++) {
            if (i === 0) {
                calendarHTML += '<tr>' + '<td>'.repeat(firstDay);
            }
            calendarHTML += `<td class="calendar-day" data-date="${i + 1}">${i + 1}</td>`;
            if ((i + firstDay) % 7 === 6) { // End of week
                calendarHTML += '</tr><tr>';
            }
        }
        calendarHTML += '</tr></table>';
        calendarContainer.innerHTML = calendarHTML;
        document.getElementById('month-year').textContent = `${monthNames[month]} ${year}`;
    }

    document.getElementById('prev-month').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar(currentMonth, currentYear);
    });

    document.getElementById('next-month').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar(currentMonth, currentYear);
    });

    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        if (name && email) {
            alert('Booking successful for ' + name);
        } else {
            alert('Please fill in all fields.');
        }
    });

    updateCalendar(currentMonth, currentYear);
});
