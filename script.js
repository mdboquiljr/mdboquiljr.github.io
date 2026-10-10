// Add your real public contact details here. Leave unknown details blank.
const portfolioContact = {
  email: '',
  github: 'https://github.com/mdboquiljr/',
  linkedin: '' // e.g. https://www.linkedin.com/in/your-username/
};

const projects = {
  campuslms: {category:'DEVELOPMENT / CLASSROOM TOOLS',title:'CampusLMS',summary:'A Flask learning management system built around day-to-day classroom work.',focus:'Give teachers one place to organize subjects and sections, publish learning work, and track student participation.',items:['Subject sections and student rosters','Quizzes and activities with section-based publishing','QR attendance check-in and reports','Student submissions and teacher scoring','Live quiz monitoring and teacher-controlled recovery'],takeaway:'CampusLMS brings classroom workflows into a single local application. The preview is illustrative; the repository contains the application source, setup guide, and tests.',repository:'https://github.com/mdboquiljr/CampusLMS'},
  python: {category:'TEACHING / PYTHON',title:'Python Teaching Demo',summary:'A classroom introduction to Python that puts understanding before memorization.',focus:'Introduce programming through approachable explanations, short examples, and opportunities for students to participate.',items:['Beginner-focused programming concepts','Code examples to discuss in class','Interactive questions and guided practice','Connections between programming and the software development life cycle'],takeaway:'A good first lesson helps students understand what the code does—and gives them the confidence to try it themselves.'},
  bot: {category:'DEVELOPMENT / STUDENT TOOLS',title:'CIT Chat bot',summary:'A Messenger chatbot project exploring a simple command-based student assistant.',focus:'Make frequently requested information easier to navigate through a conversational interface.',items:['Command-based interactions, including a help command','Messenger webhook and token configuration','Testing message delivery and replies','Iterative troubleshooting of the bot’s behavior'],takeaway:'Small interactions are useful only when they work reliably. This project is a space to learn, test, and improve. The card shows an illustrative conversation, not a live integration.'},
  activities: {category:'TEACHING / ASSESSMENT',title:'Python Learning Activities',summary:'Learning activities that connect a written problem, a flowchart, and a Python solution.',focus:'Help beginners reason through arithmetic and program flow before writing code.',items:['Multiple-choice and identification questions','Arithmetic-based programming activities','Flowcharts to translate into Python','Practice that encourages students to explain their reasoning'],takeaway:'The goal is to connect the process to the program, so learners can explain why their solution works.'},
  connect: {category:'TEACHING / CLASSROOM MATERIALS',title:'Connect & Contribute',summary:'A visual classroom presentation centered on participation, connection, and contribution.',focus:'Give students a clear starting point for reflection and discussion.',items:['Engaging visual presentation materials','Classroom discussion prompts','Interactive opportunities to participate','A focus on connection and contribution'],takeaway:'Presentation design can help make classroom discussion more inviting. The preview is a visual concept, not a screenshot of the original deck.'}
};

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded','false');
  menuButton.textContent = 'Menu';
  navigation.classList.remove('open');
}));

const firstInput = document.getElementById('first');
const secondInput = document.getElementById('second');
function updateCode() {
  document.getElementById('code-first').textContent = firstInput.value || '0';
  document.getElementById('code-second').textContent = secondInput.value || '0';
  document.getElementById('example-output').textContent = '…';
}
firstInput.addEventListener('input',updateCode);
secondInput.addEventListener('input',updateCode);
document.getElementById('example-form').addEventListener('submit', event => {
  event.preventDefault();
  const result = Number(firstInput.value) + Number(secondInput.value);
  document.getElementById('example-output').textContent = String(Number(result.toPrecision(12)));
});

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(other => {
    other.classList.toggle('active',other === button);
    other.setAttribute('aria-pressed',String(other === button));
  });
  let visible = 0;
  document.querySelectorAll('.project').forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
    if (!card.hidden) visible++;
  });
  document.getElementById('filter-status').textContent = `${visible} projects shown.`;
}));

const dialog = document.getElementById('project-dialog');
let lastProjectButton;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  lastProjectButton = button;
  document.getElementById('dialog-category').textContent = project.category;
  document.getElementById('dialog-title').textContent = project.title;
  document.getElementById('dialog-summary').textContent = project.summary;
  const details = document.getElementById('dialog-details');
  details.replaceChildren();
  function paragraph(heading,text) {
    const h = document.createElement('h3');h.textContent = heading;
    const p = document.createElement('p');p.textContent = text;
    details.append(h,p);
  }
  paragraph('The focus',project.focus);
  const h = document.createElement('h3');h.textContent = 'What it brings together';
  const ul = document.createElement('ul');
  project.items.forEach(item => {const li = document.createElement('li');li.textContent = item;ul.append(li);});
  details.append(h,ul);
  paragraph('The takeaway',project.takeaway);
  if (project.repository) {
    const link = document.createElement('a');
    link.className = 'dialog-repository';
    link.href = project.repository;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'View source on GitHub ↗';
    const note = document.createElement('p');
    note.className = 'repository-note';
    note.textContent = 'Private repository. Access requires permission.';
    details.append(link,note);
  }
  dialog.showModal();
}));
document.getElementById('close-dialog').addEventListener('click',() => dialog.close());
document.getElementById('dialog-done').addEventListener('click',() => dialog.close());
dialog.addEventListener('click',event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close',() => {if(lastProjectButton) lastProjectButton.focus();});
document.getElementById('year').textContent = new Date().getFullYear();

const contactBox = document.getElementById('contact-links');
const contacts = [];
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(portfolioContact.email)) contacts.push({label:portfolioContact.email,url:`mailto:${portfolioContact.email}`});
['github','linkedin'].forEach(key => {
  try {const url = new URL(portfolioContact[key]); if(url.protocol === 'https:') contacts.push({label:key === 'github' ? 'GitHub' : 'LinkedIn',url:url.href});} catch {}
});
if(contacts.length) {
  contactBox.querySelector('p').remove();
  contacts.forEach(contact => {
    const link = document.createElement('a');link.textContent = contact.label;link.href = contact.url;
    if(contact.url.startsWith('https:')) {link.target = '_blank';link.rel = 'noopener noreferrer';}
    contactBox.append(link);
  });
}
