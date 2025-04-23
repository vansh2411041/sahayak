$(document).ready(function() {
    $('.btn').on('click', function() {
        const name = $('#name').val();
        const password = $('#password').val();

        if (name === 'supervisor' && password === 'admin') { 
            window.location.replace('supervisor.html'); 
        } else if (name === 'worker' && password === 'admin') { 
            window.location.replace('worker.html'); 
        } else {
            alert('Invalid credentials'); 
        }
    });
});

$("#loginPage").on('submit',((e)=>{
    e.preventDefault();
}));