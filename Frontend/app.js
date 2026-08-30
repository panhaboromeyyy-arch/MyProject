const API_URL = "http://127.0.0.1:8000/api/resumes";

const resumeForm = document.getElementById("resumeForm");

// ==========================
// POST - Save Resume
// ==========================
resumeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const resumeData = {
        full_name: document.getElementById("fullName").value,
        title: document.getElementById("title").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        summary: document.getElementById("summary").value,

        skills: document
            .getElementById("skills")
            .value
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean),

        languages: document
            .getElementById("languages")
            .value
            .split(",")
            .map(language => language.trim())
            .filter(Boolean),

        experience: document.getElementById("experience").value,
        education: document.getElementById("education").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(resumeData)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error(result);
            alert("Failed to save resume.");
            return;
        }

        alert("Resume saved successfully!");
        console.log("Created resume:", result.data);

    } catch (error) {
        console.error("Connection error:", error);
        alert("Cannot connect to Laravel API.");
    }
});


// ==========================
// GET - Get Resume
// ==========================
async function getResume(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        const result = await response.json();

        console.log("GET response:", result);

        if (!response.ok) {
            console.error(result);
            alert("Failed to get resume.");
            return;
        }

        const resume = result.data;

        document.getElementById("fullName").value = resume.full_name || "";
        document.getElementById("title").value = resume.title || "";
        document.getElementById("email").value = resume.email || "";
        document.getElementById("phone").value = resume.phone || "";
        document.getElementById("location").value = resume.location || "";
        document.getElementById("summary").value = resume.summary || "";

        document.getElementById("skills").value =
            Array.isArray(resume.skills)
                ? resume.skills.join(", ")
                : "";

        document.getElementById("languages").value =
            Array.isArray(resume.languages)
                ? resume.languages.join(", ")
                : "";

        document.getElementById("experience").value =
            resume.experience || "";

        document.getElementById("education").value =
            resume.education || "";

    } catch (error) {
        console.error("GET connection error:", error);
        alert("Cannot connect to Laravel API.");
    }
}


// ==========================
// Load resume when page opens
// ==========================
const resumeId = 1;

getResume(resumeId);