function validateForm(e) {
  'use strict';
  e.preventDefault();
  const forms = document.getElementById('create-website-form');
  if (!forms.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      forms.classList.add('was-validated');
      return false;
  }
  return submitForm();
}
function submitForm() {
  const nameField = document.getElementById('website-name');
  const descField = document.getElementById('description');
  const dateField = document.getElementById('dateInput');
  const typeField = document.getElementById('website-type');
  const languageField = document.getElementById('website-language');
  const audienceField = document.getElementById('target-audience');
  const industryField = document.getElementById('industry');
  const websiteName = nameField.value;
  const Websitedesc = descField.value;
  const Websitedate = dateField.value;
  const Websitetype = typeField.value;
  const Websitelanguage = languageField.value;
  const Websiteaudience = audienceField.value;
  const Websiteindustry = industryField.value;
  const Websitenumber = "1 Page(s)";

  // Generate the slug by removing unwanted characters and converting to lowercase
  const slug = websiteName
    .toLowerCase()  
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
    const userId = "{{ user._id }}";
    const data = {
        name: websiteName,
        slug: slug,
        description: Websitedesc,
        creationDate: Websitedate,
        websiteType: Websitetype,
        numberPages: Websitenumber,
        industry: Websiteindustry,
        targetAudience: Websiteaudience,
        language: Websitelanguage,
        user: userId,
    };
  axios.post('/pages/', data)
  .then((response) => {
      const newlyCreatedId = response.data._id;
      window.location.href = `/editor/${newlyCreatedId}`;
  })
  .catch((err) => {
      alert('Failed: Page not created');
  });

  clearForm();
  return true;
}
function clearForm() {
  const nameField = document.getElementById('website-name');
  nameField.value = '';
  const forms = document.getElementById('create-website-form');
  forms.classList.remove('was-validated');
}
window.onload = function() {
  const dateInput = document.getElementById("dateInput");
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day} / ${month} / ${year}`;
  dateInput.value = formattedDate;
};
function deletePage(pageId) {
  fetch(`/pages/${pageId}`, {
      method: 'DELETE',
  })
  .then((response) => {
      if (response.ok) {
      location.reload();
      } else {
      alert('Failed to delete page');
      }
  })
  .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while deleting the page.');
  });
}
function searchKeyword() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
      const title = card.querySelector('.project-card-content-title').textContent.toLowerCase();
      const id = card.querySelector('.project-card-content-link').textContent.toLowerCase();
      if (title.includes(filter) || id.includes(filter)) {
          card.style.display = '';
      } else {
          card.style.display = 'none';
      }
  });
}