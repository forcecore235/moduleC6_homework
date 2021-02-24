const button = document.querySelector('.button')
let svgIcon = document.querySelector('.button__icon')

// // Для обычного решения без fetch к bootstrap
// const svgIconMain = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-down-left-circle" viewBox="0 0 16 16">
//                              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768l4.096-4.097z"/>
//                              </svg>`
// const svgIconFill = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
//                              <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z"/>
//                              </svg>`

button.addEventListener('click',  async function() {
    let result
    let url
    if (document.querySelector('.bi-arrow-down-left-circle')) {
        url = 'https://icons.getbootstrap.com/icons/arrow-down-left-circle-fill/'
    } else {
        url = 'https://icons.getbootstrap.com/icons/arrow-down-left-circle/'
    }
    result = await requestSvg(url, matchSvg)
    svgIcon.innerHTML = result
})

function requestSvg(url, callback) {
    return fetch(url)
        .then(response => response.body)
        .then(rb => {
            const reader = rb.getReader();
            return new ReadableStream({
                start(controller) {
                    function push() {
                        reader.read().then( ({done, value}) => {
                            if (done) {
                                controller.close();
                                return;
                            }
                            controller.enqueue(value);
                            push();
                        })
                    }

                    push();
                }
            });
        })
        .then(stream => {
            return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
        })
        .then(result => {
            return callback(result)
        });
}

function matchSvg(resultResponse) {
    const svgBootstrapPattern = '<svg .+class="bi.+\\n.+\\n</svg>'
    return resultResponse.match(svgBootstrapPattern)[0]
}

