const $ = document.querySelector.bind(document);

$('#toggleMode').addEventListener('input', function (e) {
    $('body').classList.toggle('dark');
});
