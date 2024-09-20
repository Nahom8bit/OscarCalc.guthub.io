const pages = ['inventory', 'market', 'reports'];

function createNavigation() {
    const nav = document.getElementById('nav');
    const ul = document.createElement('ul');
    
    pages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${page}`;
        a.textContent = page.charAt(0).toUpperCase() + page.slice(1);
        li.appendChild(a);
        ul.appendChild(li);
    });
    
    nav.appendChild(ul);
}

async function loadPage(page) {
    try {
        const response = await fetch(`pages/${page}.html`);
        if (!response.ok) throw new Error('Page not found');
        const content = await response.text();
        return content;
    } catch (error) {
        console.error(`Error loading ${page}:`, error);
        return `<p>Error loading ${page}. Please try again later.</p>`;
    }
}

async function createCards() {
    const main = document.getElementById('main');
    
    for (const page of pages) {
        const section = document.createElement('section');
        section.id = page;
        section.className = 'tool';
        
        const content = await loadPage(page);
        section.innerHTML = content;
        
        main.appendChild(section);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createNavigation();
    createCards();
});
