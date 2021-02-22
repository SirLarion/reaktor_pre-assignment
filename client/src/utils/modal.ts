export function showModal() {
    const modal = document.getElementById('modal');
    if(modal) modal.setAttribute('style', 'display: flex;');
}

export function hideModal() {
    const modal = document.getElementById('modal');
    if(modal) modal.setAttribute('style', 'display: none;');
}
