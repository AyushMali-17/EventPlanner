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

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('calendar-day')) {
            document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    });

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
        showLoading(true);
        setTimeout(() => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const eventType = document.getElementById('event-type').value;
            const tickets = document.getElementById('tickets').value;
            const specialRequests = document.getElementById('special-requests').value;
            const time = document.getElementById('time').value;
            const paymentMethod = document.getElementById('payment-method').value;
            const cardDetails = document.getElementById('card-details').value;

            if (name && email && eventType && tickets && time && paymentMethod && (paymentMethod === 'credit-card' ? cardDetails : true)) {
                showModal();
            } else {
                alert('Please fill in all required fields.');
            }
            showLoading(false);
        }, 1000);
    });

    document.getElementById('payment-method').addEventListener('change', function(event) {
        const paymentMethod = event.target.value;
        if (paymentMethod === 'credit-card') {
            document.getElementById('card-details').style.display = 'block';
        } else {
            document.getElementById('card-details').style.display = 'none';
        }
    });

    document.getElementById('dark-mode-toggle').addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        const elements = document.querySelectorAll('.dark-mode-toggle');
        elements.forEach(el => el.classList.toggle('dark-mode'));
    });

    function showModal() {
        const modal = document.getElementById('confirmation-modal');
        modal.style.display = "block";
        document.querySelector('.close-button').addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    function showLoading(display) {
        const loader = document.getElementById('loading');
        loader.style.display = display ? 'block' : 'none';
    }

    updateCalendar(currentMonth, currentYear);
});
