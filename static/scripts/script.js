import { successToast, errorToast, warningToast, infoToast } from "../toast/toast.js";

const toastGenerateForm = document.getElementById("toastGenerateForm");
const sampleToastBtn = document.getElementById("sampleToastBtn");

toastGenerateForm.onsubmit = (e) => {
    e.preventDefault();

    const toastType = toastGenerateForm.toast_type;
    const toastTitle = toastGenerateForm.toast_title;
    const toastDescription = toastGenerateForm.toast_description;

    switch(toastType.value) {
        case "info": {
            infoToast(toastTitle.value, toastDescription.value);
            break;
        }

        case "warning": {
            warningToast(toastTitle.value, toastDescription.value);
            break;
        }

        case "error": {
            errorToast(toastTitle.value, toastDescription.value);
            break;
        }

        case "Success": {
            successToast(toastTitle.value, toastDescription.value);
            break;
        }
    }

    toastGenerateForm.reset(); 
}

sampleToastBtn.onclick = () => {
    let random = Math.floor(Math.random() * 4);

    switch(random) {
        case 0: {
            infoToast("Lorem Ipsum", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.");
            break;
        }

        case 1: {
            warningToast("Lorem Ipsum", "Cum dicta quisquam et labore temporibus recusandae, accusantium delectus vel!");
            break;
        }

        case 2: {
            errorToast("Lorem Ipsum", "Enim iusto, nesciunt suscipit quasi illo officiis quisquam atque velit magnam doloremque ea quos.");
            break;
        }

        case 3: {
            successToast("Lorem Ipsum", "voluptatibus fugit nam accusantium provident architecto rerum corrupti?");
            break;
        }
    }
}