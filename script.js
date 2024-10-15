class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(job, priority) {
        const newJob = { job, priority };
        this.items.push(newJob);
        this.items.sort((a, b) => a.priority - b.priority); // Sort by priority
    }

    dequeue() {
        return this.items.shift(); // Remove the job with the highest priority (lowest number)
    }

    isEmpty() {
        return this.items.length === 0;
    }

    getJobs() {
        return this.items;
    }
}

const jobQueue = new PriorityQueue();
const jobList = document.getElementById('jobQueue');
const addJobButton = document.getElementById('addJob');

addJobButton.addEventListener('click', () => {
    const jobNameInput = document.getElementById('jobName');
    const jobPriorityInput = document.getElementById('jobPriority');

    const jobName = jobNameInput.value;
    const jobPriority = parseInt(jobPriorityInput.value);

    if (jobName && jobPriority) {
        jobQueue.enqueue(jobName, jobPriority);
        updateJobList();
        jobNameInput.value = '';
        jobPriorityInput.value = '';
    } else {
        alert("Please enter both job name and priority!");
    }
});

function updateJobList() {
    jobList.innerHTML = '';
    const jobs = jobQueue.getJobs();

    jobs.forEach((item, index) => {
        const jobItem = document.createElement('li');
        jobItem.className = 'job-item';
        jobItem.innerHTML = `
            ${item.job} (Priority: ${item.priority})
            <button class="delete-button" onclick="deleteJob(${index})">Delete</button>
        `;
        jobList.appendChild(jobItem);
    });
}

function deleteJob(index) {
    jobQueue.items.splice(index, 1); // Remove the job from the queue
    updateJobList();
}
