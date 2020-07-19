import '../scss/app.scss';


window.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(el => {
        sendForm(el);
    });

    const mess = {
        loading: "Loading...",
        success: "The Message was sended!",
        error: "Something is wrong :("
    }


    function sendForm (form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('statusMessage');
            statusMessage.textContent = mess.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();

            request.open('POST', 'server.php');

            // If i going to send in JSON

            //  request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            // If i going to send in JSON

            // let obj = {};

            // formData.forEach((value, key) => {
            //     obj[key] = value;
            // });

            // const json = JSON.stringify(obj);

            // push json  into .send()

            request.send(formData);

            request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = mess.success;
                    form.reset();
                    setTimeout(()=> {
                        statusMessage.remove();
                    }, 1500);
                } else {
                    statusMessage.textContent = mess.error;
                }
            });
        });
    };
});

