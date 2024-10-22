interface Contact {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

async function submitContactForm(event: Event): Promise<void> {
    event.preventDefault();

    const nameInput = document.getElementById('name') as HTMLInputElement;
    const name: string = nameInput.value;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const email: string = emailInput.value;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const phone: string = phoneInput.value;
    const subjectInput = document.getElementById('subject') as HTMLInputElement;
    const subject: string = subjectInput.value;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement;
    const message: string = messageInput.value;

    resetInputStyles();

    let isValid: boolean = true;

    if (!name) {
        isValid = false;
        showError(nameInput, 'This field is required.');
    }
    if (!email) {
        isValid = false;
        showError(emailInput, 'This field is required.');
    }
    if (!phone) {
        isValid = false;
        showError(phoneInput, 'This field is required.');
    }
    if (!subject) {
        isValid = false;
        showError(subjectInput, 'This field is required.');
    }
    if (!message) {
        isValid = false;
        showError(messageInput, 'This field is required.');
    }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        emailInput.style.border = '1px solid red';
        isValid = false;
    }

    const phoneRegex: RegExp = /^\+?[1-9]\d{1,14}$/;
    if (phone && !phoneRegex.test(phone)) {
        phoneInput.style.border = '1px solid red';
        isValid = false;
    }

    if (phone && phone.length !== 10) {
        phoneInput.style.border = '1px solid red';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const newContact: Contact = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
    };

    try {
        const response: Response = await fetch('https://6717ea54b910c6a6e02a8d7f.mockapi.io/guvi/ayushb/contactus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContact),
        });

        if (response.ok) {
            const task = await response.json();
            console.log('Contact submitted successfully:', task);
            showSuccessMessage();
            formElement.reset(); 
        } else {
            console.error('Error submitting form:', response.statusText);
            showErrorMessage('Submission Failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showErrorMessage('Submission Failed. Please try again.');
    }
}

function resetInputStyles(): void {
    const inputs: HTMLInputElement[] = [
        document.getElementById('name') as HTMLInputElement,
        document.getElementById('email') as HTMLInputElement,
        document.getElementById('phone') as HTMLInputElement,
        document.getElementById('subject') as HTMLInputElement,
        document.getElementById('message') as HTMLTextAreaElement
    ];
    inputs.forEach(input => {
        input.style.border = '1px solid rgb(203 213 225 / var(--tw-border-opacity))';
    });
}

function showError(input: HTMLInputElement | HTMLTextAreaElement, message: string): void {
    input.style.border = '1px solid red';
}

function showSuccessMessage(): void {
    const successBox = document.getElementById("success-box") as HTMLElement;
    const backdrop = document.getElementById("success-backdrop") as HTMLElement;

    if (successBox.classList.contains("hidden")) {
        successBox.classList.remove("hidden");
        backdrop.classList.remove("hidden");
    } else {
        successBox.classList.add("hidden");
        backdrop.classList.add("hidden");
    }
}

function showErrorMessage(message: string): void {
    console.error(message);
}

const formElement = document.getElementById('contact-form') as HTMLFormElement;
formElement.addEventListener('submit', submitContactForm);
