var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function submitContactForm(event) {
    return __awaiter(this, void 0, void 0, function () {
        var nameInput, name, emailInput, email, phoneInput, phone, subjectInput, subject, messageInput, message, isValid, emailRegex, phoneRegex, newContact, response, task, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    nameInput = document.getElementById('name');
                    name = nameInput.value;
                    emailInput = document.getElementById('email');
                    email = emailInput.value;
                    phoneInput = document.getElementById('phone');
                    phone = phoneInput.value;
                    subjectInput = document.getElementById('subject');
                    subject = subjectInput.value;
                    messageInput = document.getElementById('message');
                    message = messageInput.value;
                    resetInputStyles();
                    isValid = true;
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
                    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (email && !emailRegex.test(email)) {
                        emailInput.style.border = '1px solid red';
                        isValid = false;
                    }
                    phoneRegex = /^\+?[1-9]\d{1,14}$/;
                    if (phone && !phoneRegex.test(phone)) {
                        phoneInput.style.border = '1px solid red';
                        isValid = false;
                    }
                    if (phone && phone.length !== 10) {
                        phoneInput.style.border = '1px solid red';
                        isValid = false;
                    }
                    if (!isValid) {
                        return [2 /*return*/];
                    }
                    newContact = {
                        name: name,
                        email: email,
                        phone: phone,
                        subject: subject,
                        message: message,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch('https://6717ea54b910c6a6e02a8d7f.mockapi.io/guvi/ayushb/contactus', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newContact),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    task = _a.sent();
                    console.log('Contact submitted successfully:', task);
                    showSuccessMessage();
                    formElement.reset();
                    return [3 /*break*/, 5];
                case 4:
                    console.error('Error submitting form:', response.statusText);
                    showErrorMessage('Submission Failed. Please try again.');
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    showErrorMessage('Submission Failed. Please try again.');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function resetInputStyles() {
    var inputs = [
        document.getElementById('name'),
        document.getElementById('email'),
        document.getElementById('phone'),
        document.getElementById('subject'),
        document.getElementById('message')
    ];
    inputs.forEach(function (input) {
        input.style.border = '1px solid rgb(203 213 225 / var(--tw-border-opacity))';
    });
}
function showError(input, message) {
    input.style.border = '1px solid red';
}
function showSuccessMessage() {
    var successBox = document.getElementById("success-box");
    var backdrop = document.getElementById("success-backdrop");
    if (successBox.classList.contains("hidden")) {
        successBox.classList.remove("hidden");
        backdrop.classList.remove("hidden");
    }
    else {
        successBox.classList.add("hidden");
        backdrop.classList.add("hidden");
    }
}
function showErrorMessage(message) {
    console.error(message);
}
var formElement = document.getElementById('contact-form');
formElement.addEventListener('submit', submitContactForm);
