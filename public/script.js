document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggleButton = document.getElementById('dark-mode-toggle');
    darkModeToggleButton.addEventListener('click', toggleDarkMode);

    loadProjects();

    const contactForm = document.querySelector('#contact form');
    contactForm.onsubmit = handleFormSubmit;

    function highlightFormElement(event) {
        event.target.style.backgroundColor = '#e8e8e8';
        event.target.style.color = '#333'; 
      }
      
      function resetFormElement(event) {
        event.target.style.backgroundColor = ''; 
        event.target.style.color = ''; 
      }
      
      document.querySelectorAll('#contact input, #contact textarea').forEach(element => {
        element.addEventListener('mouseover', highlightFormElement);
        element.addEventListener('mouseout', resetFormElement);
      });

      document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
      
});

function toggleDarkMode() {
    const body = document.body;
    body.classList.add('dark-mode-transition');
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    
    setTimeout(() => {
        body.classList.remove('dark-mode-transition');
    }, 300);
    
    const darkModeToggleButton = document.getElementById('dark-mode-toggle');
    if (body.classList.contains('dark-mode')) {
        darkModeToggleButton.textContent = 'Light Mode';
    } else {
        darkModeToggleButton.textContent = 'Dark Mode';
    }
}


function loadProjects() {
    const projects = [
        {
            id: "newGirlTwitterBot",
            title: "New Girl Twitter Bot",
            description: "Built a Twitter bot using Tweepy to tweet out-of-context dialogues from one of my favorite shows, New Girl. I scraped the show's transcript off the web using Beautiful Soup and deployed it as a web app on PythonAnywhere.",
            repoLink: "https://github.com/fauxriarty/New-Girl-Bot"
        },
        {
            id: "chamberlyApp",
            title: "Chamberly AB Android App",
            description: "Developed an Android version of the Chamberly app (currently only available on iOS), using Kotlin on Android Studio.",
            repoLink: "https://github.com/fauxriarty/Chamberly"
        }
    ];

    const projectsContainer = document.getElementById('projects');
    projects.forEach(project => {
        let projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    let projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.id = project.id;
    projectCard.innerHTML = `
        <a href="${project.repoLink}" class="repo-link">Visit Repository</a>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
    `;
    return projectCard;
}

function handleFormSubmit(e) {
    e.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (validateForm(name, email, message)) {
        console.log('Form is valid. Implement submission logic here.');
        alert('Thank you for your message!');
        e.target.reset(); 
        document.getElementById('name').focus(); 
    } else {
        alert('Please fill in all the fields.');
    }
}

function validateForm(name, email, message) {
    return name !== '' && email !== '' && message !== '';
}

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggleButton.textContent = 'Light Mode';
}



document.getElementById('name').onchange = function() { console.log('Name changed.'); };
document.getElementById('message').oninput = function() { console.log('Message input changed.'); };
document.getElementById('message').onfocus = function() { console.log('Message input focused.'); };
document.getElementById('message').onblur = function() { console.log('Message input blurred.'); };

