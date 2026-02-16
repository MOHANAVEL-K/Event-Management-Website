const jobContainer = document.getElementById('job-container');
const filterRole = document.getElementById('filter-role');
const filterType = document.getElementById('filter-type');

let jobsData = [];

async function loadJobs() {
    try {
        const response = await fetch('./data/jobs.json');
        jobsData = await response.json();
        displayJobs(jobsData);
    } catch (error) {
        console.error('Error loading jobs:', error);
        jobContainer.innerHTML = '<p>Unable to load jobs right now.</p>';
    }
}

function displayJobs(jobs) {
    jobContainer.innerHTML = '';

    if (jobs.length === 0) {
        jobContainer.innerHTML = '<p>No jobs found matching your criteria.</p>';
        return;
    }

    jobs.forEach((job) => {
        const card = document.createElement('div');
        card.classList.add('job-card');

        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong></p>
            <p>Location: ${job.location}</p>
            <div style="margin-top:10px;">
                <span class="tag">${job.type}</span>
                <small style="float:right; color:#888;">${job.posted}</small>
            </div>
            <button type="button">Apply Now</button>
        `;
        jobContainer.appendChild(card);
    });
}

function filterJobs() {
    const searchTerm = filterRole.value.toLowerCase();
    const typeTerm = filterType.value;

    const filtered = jobsData.filter((job) => {
        const matchesRole =
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm);
        const matchesType = typeTerm === 'All' || job.type === typeTerm;

        return matchesRole && matchesType;
    });

    displayJobs(filtered);
}

if (filterRole && filterType) {
    filterRole.addEventListener('input', filterJobs);
    filterType.addEventListener('change', filterJobs);
}

if (jobContainer) {
    loadJobs();
}
