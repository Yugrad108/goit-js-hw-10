const STORAGE_FORM_KEY = 'feedback-form-state';  

const formData = { email: '', message: '' };  

const refs = {  
  form: document.querySelector('.feedback-form'),  
};  

function initPage() {  
  const savedData = loadFromLS(STORAGE_FORM_KEY);  

  if (savedData) {  
    refs.form.elements.email.value = savedData.email || '';  
    refs.form.elements.message.value = savedData.message || '';  
  }  
}  

initPage();

refs.form.addEventListener('input', e => {  
  const email = e.currentTarget.elements.email.value.trim();  
  const message = e.currentTarget.elements.message.value.trim();  

  formData.email = email;  
  formData.message = message;  

  saveToLS(STORAGE_FORM_KEY, formData);  
});  

refs.form.addEventListener('submit', e => {  
  e.preventDefault();  

  const email = e.currentTarget.elements.email.value.trim();  
  const message = e.currentTarget.elements.message.value.trim();  

  if (!email || !message) {  
    alert('Please fill in all fields');  
    return;  
  }  

  formData.email = email;  
  formData.message = message;  

  console.log('Submitted data:', formData);  

  localStorage.removeItem(STORAGE_FORM_KEY);  
  refs.form.reset();  
});  

function saveToLS(key, value) {  
  localStorage.setItem(key, JSON.stringify(value));  
}  

function loadFromLS(key) {  
  try {  
    return JSON.parse(localStorage.getItem(key)) || null;  
  } catch (error) {  
    console.error('Error parsing data from localStorage:', error);  
    return null;  
  }  
}

