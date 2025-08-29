document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.work-request');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Сбор выбранных услуг
    const selectedOptions = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      selectedOptions.push(checkbox.nextElementSibling.textContent.trim());
    });
    
    // Параметры письма
    const templateParams = {
      title: "Новый запрос на услуги",
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      time: new Date().toLocaleString('ru-RU'),
      message: `Запрошенные услуги: ${selectedOptions.join(', ')}`
    };
    
    // Отправка письма
    emailjs.send('service_a1bk69f', 'template_du5x4mt', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Сообщение успешно отправлено!');
        form.reset();
      }, function(error) {
        console.log('FAILED...', error);
        alert('Ошибка отправки: ' + error.text);
      });
  });
});