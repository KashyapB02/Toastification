import { successToast, errorToast, warningToast, infoToast } from "../toast/toast.js";

const toastGenerateForm = document.getElementById("toastGenerateForm");
const sampleToastBtn = document.getElementById("sampleToastBtn");

toastGenerateForm.onsubmit = (e) => {
    e.preventDefault();

    const toastPosition = toastGenerateForm.toast_position;
    const toastType = toastGenerateForm.toast_type;
    const toastTitle = toastGenerateForm.toast_title;
    const toastDescription = toastGenerateForm.toast_description;

    const toast = {
        position: toastPosition.value,
        title: toastTitle.value,
        message: toastDescription.value
    }

    switch(toastType.value) {
        case "info": { infoToast(toast); break; }
        case "warning": { warningToast(toast); break; }
        case "error": { errorToast(toast); break; }
        case "Success": { successToast(toast); break; }
    }

    toastGenerateForm.reset(); 
}

sampleToastBtn.onclick = () => {
    let randomToast = Math.floor(Math.random() * 4);
    let randomPosition = Math.floor(Math.random() * 6);

    const positions = ["topRight", "topCenter", "topLeft", "bottomRight", "bottomCenter", "bottomLeft"];
    const descriptions = [
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        "Cum dicta quisquam et labore temporibus recusandae, accusantium delectus vel!",
        "Enim iusto, nesciunt suscipit quasi illo officiis quisquam atque velit magnam doloremque ea quos.",
        "voluptatibus fugit nam accusantium provident architecto rerum corrupti?"
    ]

    const toast = {
        position: positions[randomPosition],
        title: "Lorem Ipsum",
        message: descriptions[randomToast]
    }

    switch(randomToast) {
        case 0: { infoToast(toast); break; }
        case 1: { warningToast(toast); break; }
        case 2: { errorToast(toast); break; }
        case 3: { successToast(toast); break; }
    }
}