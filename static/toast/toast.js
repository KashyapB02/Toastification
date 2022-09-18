let toastId = "toastCss";
let toastAnimationId = "toastAnimationCss";

[
    { id: toastId, stylesheet: "toast" },
    { id: toastAnimationId, stylesheet: "toast-animation" }
].forEach((item) => {
    if (!document.getElementById(item.id)) {
        let origin = window.location.origin;
        let head = document.getElementsByTagName("head")[0];

        let link = document.createElement("link");
        link.setAttribute("id", item.id);
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");

        // TODO: Change the value of 'href' attribute according to
        //       the placement of '/toast' folder in your file structure.
        link.setAttribute("href", `${origin}/static/toast/${item.stylesheet}.css`);
        link.setAttribute("media", "screen,print");
        head.appendChild(link);
    }
})

function prepareToast (props) {
    let ativeTimeout, start, remaining;

    let toast = `<div class="toast ${props.position}" id="toast"></div>`
    let toastDiv = null;

    if (!document.getElementById("toast"))
        document.body.insertAdjacentHTML("afterbegin", toast);
    else {
        const toastDivs = document.querySelectorAll("#toast");

        for (let div of toastDivs) {
            if (div.classList.contains(props.position)) {
                toastDiv = div;
                break;
            }
        }

        if (!toastDiv) {
            document.body.insertAdjacentHTML("afterbegin", toast);
            const toastDivList = document.querySelectorAll("#toast")
            toastDiv = [...toastDivList][0];
        }
    }

    if (!toastDiv)
        toastDiv = document.getElementById("toast");

    let activeAnimationClass = null;
    let closeAnimationClass = null;

    if ((props.position === "topRight") || (props.position === "bottomRight")) {
        activeAnimationClass = "rightActiveAnimation";
        closeAnimationClass = "rightCloseAnimation";
    } else if ((props.position === "topLeft") || (props.position === "bottomLeft")) {
        activeAnimationClass = "leftActiveAnimation";
        closeAnimationClass = "leftCloseAnimation";
    } else {
        activeAnimationClass = `${props.position}ActiveAnimation`;
        closeAnimationClass = `${props.position}CloseAnimation`;
    }

    let toastContainer = `
        <div class="toastContainer ${activeAnimationClass}" id="toastContainer">
            <div class="toastContent">
                <div class="toastTitleContainer">
                    <span class="toastTypeIcon ${props.type}">${props.svg}</span>
                    <p class="toastTitle">${props.title}</p>
                </div>
                <p class="toastMsg">${props.msg}</p>
            </div>
            <span class="toastCloseBtn" id="toastCloseBtn" title="Close"><p></p></span>
        </div>
    `

    toastDiv.insertAdjacentHTML("beforeend", toastContainer);
    const toastContainerDivList = toastDiv.querySelectorAll("#toastContainer");
    const toastContainerDiv = [...toastContainerDivList].pop();

    function handleToast () {
        toastContainerDiv.classList.remove(activeAnimationClass);
        toastContainerDiv.classList.add(closeAnimationClass);

        setTimeout(function () {
            (toastContainerDiv.parentNode).removeChild(toastContainerDiv);
        }, 200);
    }

    const activateTimeout = (timer) => {
        ativeTimeout = setTimeout(handleToast, timer);
        start = Date.now();
    }

    const toastCloseBtnList = toastDiv.querySelectorAll("#toastCloseBtn");
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

export const successToast = (toast) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
        </svg>
    `

    const props = {
        position: toast.position,
        title: toast.title,
        msg: toast.message,
        svg: svg,
        type: "successToast"
    }

    prepareToast(props);
}

export const errorToast = (toast) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
        </svg>
    `

    const props = {
        position: toast.position,
        title: toast.title,
        msg: toast.message,
        svg: svg,
        type: "errorToast"
    }

    prepareToast(props);
}

export const warningToast = (toast) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/>
        </svg>
    `

    const props = {
        position: toast.position,
        title: toast.title,
        msg: toast.message,
        svg: svg,
        type: "warningToast"
    }

    prepareToast(props);
}

export const infoToast = (toast) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/>
        </svg>
    `
    const props = {
        position: toast.position,
        title: toast.title,
        msg: toast.message,
        svg: svg,
        type: "infoToast"
    }

    prepareToast(props);
}