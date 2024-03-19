// mini calendar functions

document.addEventListener('DOMContentLoaded', function () {
    const calendarHeader = document.getElementById('month-name');
    const calendar = document.getElementById('mini-calendar');

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function renderCalendar() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const todaysDate = currentDate.getDate();

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate(); // Get the number of days in the previous month
        const daysInNextMonth = 7 - ((firstDayOfMonth + daysInMonth) % 7); // Calculate the number of days to show from the next month to complete the last week

        let html = '';
        let dayCount = 0; // Counter to keep track of the number of days displayed

        // Render previous month's days
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            html += `<div class="col text-center not-current-month">${daysInPrevMonth - i}</div>`;
            dayCount++;
        }

        // Render current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            if (dayCount % 7 === 0) {
                html += `</div><div class="row">`; // Start a new row after every 7 days
            }
            
            // Check if today's date matches the current date
            if (i === todaysDate) {
                html += `<div class="col text-center todays-date">${i}</div>`; //adds the class .todays-date
            } else {
                html += `<div class="col text-center">${i}</div>`;
            }

            dayCount++;
        }

        // Render next month's days
        for (let i = 1; i <= daysInNextMonth; i++) {
            html += `<div class="col text-center not-current-month">${i}</div>`;
            dayCount++;
        }

        calendarHeader.innerHTML = monthNames[currentMonth];
        calendar.innerHTML = html;
    }

    renderCalendar();
});
