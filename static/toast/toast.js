let cssId = "toastCss";

if (!document.getElementById(cssId)) {
    let origin = window.location.origin;

    const head = document.getElementsByTagName("head")[0];
    const link = document.createElement("link");
    link.setAttribute("id", cssId);
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", `${origin}/static/toast/toast.css`);
    link.setAttribute("media", "screen,print");

    head.appendChild(link);
}

function toast (title, message, svg, toastType) {
    let ativeTimeout, start, remaining;

    const toast = `<div class="toast" id="toast"></div>`
    if (!document.getElementById("toast"))
        document.body.insertAdjacentHTML("afterbegin", toast);

    const toastDiv = document.getElementById("toast")
    if (toastDiv.childElementCount) {
        toastDiv.removeChild(toastDiv.lastChild)

        if (ativeTimeout)
            clearTimeout(ativeTimeout);
    }

    const toastContainer = `
        <div class="toastContainer toastActive" id="toastContainer">
            <div class="toastContent">
                <div class="toastTitleContainer">
                    <span class="toastTypeIcon ${toastType}">${svg}</span>
                    <p class="toastTitle">${title}</p>
                </div>
                <p class="toastMsg">${message}</p>
            </div>
            <span class="toastCloseBtn" id="toastCloseBtn" title="Close"><p></p></span>
        </div>
    `

    toastDiv.insertAdjacentHTML("beforeend", toastContainer);
    const toastContainerDivList = document.querySelectorAll("#toastContainer");
    const toastContainerDiv = [...toastContainerDivList].pop();

    function handleToast () {
        toastContainerDiv.classList.remove("toastActive");
        toastContainerDiv.classList.add("toastClose");

        setTimeout(function () {
            (toastContainerDiv.parentNode).removeChild(toastContainerDiv);
        }, 200);
    }

    const activateTimeout = (timer) => {
        ativeTimeout = setTimeout(handleToast, timer);
        start = Date.now();
    }

    const toastCloseBtnList = document.querySelectorAll("#toastCloseBtn");
    const toastCloseBtn = [...toastCloseBtnList].pop();
    toastCloseBtn.onclick = function () { handleToast(); }

    activateTimeout(5000);

    toastContainerDiv.onclick = function () { clearTimeout(ativeTimeout); }
    if (window.matchMedia("(any-hover: hover)").matches || window.matchMedia("(hover: hover)").matches) {
        toastContainerDiv.onmouseover = function () { clearTimeout(ativeTimeout); }
        toastContainerDiv.onmouseleave = function () { 
            remaining = (5000 - (Date.now() - start));
            if (!(remaining > 0))
                handleToast();
            else
                activateTimeout(remaining);
        }
    }
}

export const successToast = (title, message) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
        </svg>
    `

    toast(title, message, svg, "successToast");
}

export const errorToast = (title, message) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
        </svg>
    `

    toast(title, message, svg, "errorToast");
}

export const warningToast = (title, message) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/>
        </svg>
    `

    toast(title, message, svg, "warningToast");
}

export const infoToast = (title, message) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/>
        </svg>
    `

    toast(title, message, svg, "infoToast");
}