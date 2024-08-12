/* script.js */
document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    function displayCalendar(month, year) {
        // Basic function to display days of the month
        calendarContainer.innerHTML = ''; // Clear previous calendar
        // Generate calendar grid here
    }

    displayCalendar(currentMonth, currentYear);
});
