// ==========================================
// CONFIGURATION & GLOBAL CONSTANTS
// ==========================================
const API_BASE_URL = 'http://127.0.0.1:8000/api/resumes';

// ==========================================
// 1. LIVE PREVIEW RENDER LOGIC
// ==========================================
function updatePreview() {
  // Personal Details
  const fullName = document.getElementById('fullName')?.value || 'YOUR NAME';
  const jobTitle = document.getElementById('jobTitle')?.value || 'JOB TITLE';
  const email = document.getElementById('email')?.value || 'email@example.com';
  const phone = document.getElementById('phone')?.value || '+855 12 345 678';
  const address = document.getElementById('address')?.value || 'Phnom Penh, Cambodia';
  const summary = document.getElementById('profileSummary')?.value || 'Your profile summary will appear here...';

  // Preview DOM Elements
  const previewName = document.getElementById('previewName');
  const previewTitle = document.getElementById('previewTitle');
  const previewEmail = document.getElementById('previewEmail');
  const previewPhone = document.getElementById('previewPhone');
  const previewAddress = document.getElementById('previewAddress');
  const previewSummary = document.getElementById('previewSummary');

  if (previewName) previewName.textContent = fullName;
  if (previewTitle) previewTitle.textContent = jobTitle;
  if (previewEmail) previewEmail.textContent = email;
  if (previewPhone) previewPhone.textContent = phone;
  if (previewAddress) previewAddress.textContent = address;
  if (previewSummary) previewSummary.textContent = summary;

  // Render Skills List
  const skillsInput = document.getElementById('skillsInput')?.value || '';
  const previewSkills = document.getElementById('previewSkills');
  if (previewSkills) {
    previewSkills.innerHTML = '';
    const skillsArray = skillsInput.split('\n').filter(item => item.trim() !== '');
    skillsArray.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill.trim();
      previewSkills.appendChild(li);
    });
  }

  // Render Experience List
  const expInput = document.getElementById('experienceInput')?.value || '';
  const previewExperience = document.getElementById('previewExperience');
  if (previewExperience) {
    previewExperience.innerHTML = '';
    const expArray = expInput.split('\n').filter(item => item.trim() !== '');
    expArray.forEach(exp => {
      const p = document.createElement('p');
      p.textContent = exp.trim();
      previewExperience.appendChild(p);
    });
  }

  // Apply Theme Color
  const themeColor = document.getElementById('themeColor')?.value || '#f2dede';
  const previewContainer = document.getElementById('resumePreview');
  if (previewContainer) {
    previewContainer.style.borderColor = themeColor;
    const headers = previewContainer.querySelectorAll('h1, h2, .accent-header');
    headers.forEach(h => h.style.color = themeColor);
  }

  // Apply Template Class
  const templateStyle = document.getElementById('templateSelect')?.value || 'modern-cv';
  if (previewContainer) {
    previewContainer.className = `resume-preview ${templateStyle}`;
  }
}

// Attach Live Update Listeners to Inputs
function attachInputListeners() {
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview);
  });
}

// ==========================================
// 2. LARAVEL API INTEGRATION (CRUD)
// ==========================================

// [POST] Save Resume to MySQL
async function saveResumeToDatabase() {
  const skillsInput = document.getElementById('skillsInput')?.value || '';
  const skillsArray = skillsInput.split('\n').filter(item => item.trim() !== '');

  const expInput = document.getElementById('experienceInput')?.value || '';
  const experienceArray = expInput.split('\n').filter(item => item.trim() !== '');

  const payload = {
    full_name: document.getElementById('fullName')?.value || 'Untitled Resume',
    title: document.getElementById('jobTitle')?.value || '',
    email: document.getElementById('email')?.value || '',
    phone: document.getElementById('phone')?.value || '',
    address: document.getElementById('address')?.value || '',
    summary: document.getElementById('profileSummary')?.value || '',
    template_style: document.getElementById('templateSelect')?.value || 'modern-cv',
    theme_color: document.getElementById('themeColor')?.value || '#f2dede',
    skills: skillsArray,
    experience: experienceArray
  };

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert('Resume saved to MySQL database successfully!');
      fetchSavedResumes();
    } else {
      const errData = await response.json();
      console.error('Validation Error:', errData);
      alert('Failed to save resume. Please check missing required fields.');
    }
  } catch (error) {
    console.error('API Connection Error:', error);
    alert('Cannot reach Laravel backend. Make sure "php artisan serve" is running!');
  }
}

// [GET] Fetch & Render Saved Resumes List
async function fetchSavedResumes() {
  const container = document.getElementById('savedResumesList');
  if (!container) return;

  try {
    const response = await fetch(API_BASE_URL);
    const resumes = await response.json();

    container.innerHTML = '';

    if (!Array.isArray(resumes) || resumes.length === 0) {
      container.innerHTML = '<p class="text-muted">No saved resumes found in database.</p>';
      return;
    }

    resumes.forEach(resume => {
      const card = document.createElement('div');
      card.className = 'resume-card';
      card.style = 'border: 1px solid #ddd; padding: 12px; margin-bottom: 10px; border-radius: 6px; background: #fff;';

      const formattedDate = new Date(resume.created_at).toLocaleDateString();

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="font-size: 1.1em;">${resume.full_name}</strong> 
            <span style="color: #666;">- ${resume.title || 'No Title'}</span>
            <br><small style="color: #888;">Saved on: ${formattedDate}</small>
          </div>
          <div>
            <button type="button" onclick="loadResume(${resume.id})" style="padding: 5px 10px; margin-right: 5px; cursor: pointer;">Load</button>
            <button type="button" onclick="deleteResume(${resume.id})" style="padding: 5px 10px; color: red; cursor: pointer;">Delete</button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching resumes:', error);
  }
}

// [GET ID] Load Specific Resume Back into Form
async function loadResume(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch resume details');

    const resume = await response.json();

    // Populate Form Inputs
    if (document.getElementById('fullName')) document.getElementById('fullName').value = resume.full_name || '';
    if (document.getElementById('jobTitle')) document.getElementById('jobTitle').value = resume.title || '';
    if (document.getElementById('email')) document.getElementById('email').value = resume.email || '';
    if (document.getElementById('phone')) document.getElementById('phone').value = resume.phone || '';
    if (document.getElementById('address')) document.getElementById('address').value = resume.address || '';
    if (document.getElementById('profileSummary')) document.getElementById('profileSummary').value = resume.summary || '';
    if (document.getElementById('templateSelect')) document.getElementById('templateSelect').value = resume.template_style || 'modern-cv';
    if (document.getElementById('themeColor')) document.getElementById('themeColor').value = resume.theme_color || '#f2dede';

    // Populate Skills & Experience Arrays into Textareas
    if (document.getElementById('skillsInput')) {
      document.getElementById('skillsInput').value = Array.isArray(resume.skills) ? resume.skills.join('\n') : '';
    }
    if (document.getElementById('experienceInput')) {
      document.getElementById('experienceInput').value = Array.isArray(resume.experience) ? resume.experience.join('\n') : '';
    }

    // Refresh Live Preview
    updatePreview();

    alert(`Successfully loaded resume for: ${resume.full_name}`);
  } catch (error) {
    console.error('Error loading resume:', error);
    alert('Failed to load resume details.');
  }
}

// [DELETE] Remove Resume Record from Database
async function deleteResume(id) {
  if (!confirm('Are you sure you want to delete this resume record from MySQL?')) return;

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert('Resume deleted successfully!');
      fetchSavedResumes();
    } else {
      alert('Failed to delete resume.');
    }
  } catch (error) {
    console.error('Error deleting resume:', error);
    alert('Connection error while attempting deletion.');
  }
}

// ==========================================
// 3. INITIALIZATION ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  attachInputListeners();
  updatePreview();
  fetchSavedResumes();
});