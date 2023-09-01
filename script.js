document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const scheduleSection = document.getElementById('schedule');
    const scheduleContent = document.getElementById('scheduleContent');
    const ocrButton = document.createElement('button');
    ocrButton.innerText = 'Upload and Extract Schedule Image';

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (data.status === 'success') {
            loginForm.style.display = 'none';
            scheduleSection.classList.remove('hidden');
            loadSchedule();
        } else {
            // Display error message
        }
    });

    ocrButton.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();

        input.addEventListener('change', function () {
            const image = input.files[0];
            performOCR(image);
        });
    });

    function loadSchedule() {
        fetch('/get_schedule')
            .then(response => response.json())
            .then(data => {
                scheduleContent.innerHTML = `<p>${data.data}</p>`;
                scheduleContent.appendChild(ocrButton);
            });
    }

    async function performOCR(image) {
        const formData = new FormData();
        formData.append('image', image);

        const response = await fetch('/perform_ocr', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.status === 'success') {
            const textarea = document.createElement('textarea');
            textarea.value = data.text;
            scheduleContent.appendChild(textarea);
        } else {
            // Handle OCR error
        }
    }
});
