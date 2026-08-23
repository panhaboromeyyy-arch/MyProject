const fields = ['fullName', 'title', 'email', 'phone', 'location', 'summary', 'skills', 'languages', 'experience', 'education'];
const form = document.querySelector('#resumeForm');
const defaults = Object.fromEntries(fields.map((id) => [id, document.querySelector(`#${id}`).value]));

const setText = (field, preview) => {
  document.querySelector(`#${preview}`).textContent = document.querySelector(`#${field}`).value.trim() || '—';
};

const setList = (field, preview) => {
  const target = document.querySelector(`#${preview}`);
  const values = document.querySelector(`#${field}`).value.split(',').map((item) => item.trim()).filter(Boolean);
  target.innerHTML = values.map((item) => `<li>${item}</li>`).join('') || '<li>—</li>';
};

const setEntry = (field, preview) => {
  const target = document.querySelector(`#${preview}`);
  const parts = document.querySelector(`#${field}`).value.trim().split('\n');
  const heading = parts.shift() || '—';
  target.innerHTML = `<div class="entry"><strong>${heading}</strong>${parts.join('\n')}</div>`;
};

function updatePreview() {
  setText('fullName', 'previewName'); setText('title', 'previewTitle'); setText('email', 'previewEmail');
  setText('phone', 'previewPhone'); setText('location', 'previewLocation'); setText('summary', 'previewSummary');
  setList('skills', 'previewSkills'); setList('languages', 'previewLanguages');
  setEntry('experience', 'previewExperience'); setEntry('education', 'previewEducation');
  const name = document.querySelector('#fullName').value.trim().split(/\s+/).filter(Boolean);
  document.querySelector('#previewInitials').textContent = name.map((word) => word[0]).slice(0, 2).join('').toUpperCase() || 'RS';
}

form.addEventListener('input', updatePreview);
document.querySelector('#printButton').addEventListener('click', () => window.print());
document.querySelector('#resetButton').addEventListener('click', () => { Object.entries(defaults).forEach(([id, value]) => { document.querySelector(`#${id}`).value = value; }); updatePreview(); });
updatePreview();
