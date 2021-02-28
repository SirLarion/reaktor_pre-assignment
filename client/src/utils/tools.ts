// Return an error message depending on what status code the
// error in question has. If there's no status code, the gateway
// server is offline
export const getErrorMessage = (code: number | undefined): string => {
    let message = '';
    if(code) message = `Getting storage data failed: ${code}`;
    else message = 'API gateway server offline';

    return message;
}

// Display loader modal
export function showModal() {
    const modal = document.getElementById('modal');
    if(modal) modal.setAttribute('style', 'display: flex;');
}

// Hide loader modal
export function hideModal() {
    const modal = document.getElementById('modal');
    if(modal) modal.setAttribute('style', 'display: none;');
}

// Helper; changes which of the category nav buttons is displayed as active
export function changeActiveCategoryButton(oldId: string, newId: string) {
    const oldActive = document.getElementById(oldId);
    const newActive = document.getElementById(newId);
    if(oldActive && newActive) {
        oldActive.className = 'categories__button';
        newActive.className = 'categories__button button--active';
    }
}

// Scroll the page back to top: smoothly if the page hadn't been scrolled
// much, otherwise snap
export function scrollPageToTop() {
    if(document.documentElement.scrollTop < 3 * window.innerHeight) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else window.scrollTo(0, 0);
}
