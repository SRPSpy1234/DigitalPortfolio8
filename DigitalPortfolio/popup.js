// DMC Table Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create popup element
    const popup = document.createElement('div');
    popup.id = 'dmc-popup';
    popup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0a5a58, #004a52);
        color: #ffffff;
        padding: 20px 25px;
        border-radius: 15px;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.5;
        max-width: 350px;
        min-width: 300px;
        text-align: left;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        z-index: 2147483647;
        opacity: 0;
        visibility: hidden;
        border: 3px solid rgba(19, 240, 236, 0.6);
        backdrop-filter: blur(15px);
        pointer-events: none;
        transition: opacity 0.1s ease, visibility 0.1s ease;
    `;
    document.body.appendChild(popup);

    // Add event listeners to hover rows
    const hoverRows = document.querySelectorAll('.hover-row');
    
    hoverRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            const comparison = this.getAttribute('data-comparison');
            const fact = this.getAttribute('data-fact');
            
            popup.innerHTML = `${comparison}<br><br>Fun Fact: ${fact}`;
            popup.style.opacity = '1';
            popup.style.visibility = 'visible';
        });

        row.addEventListener('mouseleave', function() {
            popup.style.opacity = '0';
            popup.style.visibility = 'hidden';
        });
    });

    // Add event listener to DMC title
    const dmcTitle = document.querySelector('.dmc-title-hover');
    
    if (dmcTitle) {
        dmcTitle.addEventListener('mouseenter', function() {
            const message = this.getAttribute('data-message');
            
            popup.innerHTML = `${message}`;
            popup.style.opacity = '1';
            popup.style.visibility = 'visible';
        });

        dmcTitle.addEventListener('mouseleave', function() {
            popup.style.opacity = '0';
            popup.style.visibility = 'hidden';
        });
    }
});