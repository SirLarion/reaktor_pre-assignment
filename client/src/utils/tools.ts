// Return an error message depending on what status code the
// error in question has. If there's no status code, the gateway
// server is offline
export const getErrorMessage = (code: number | undefined): string => {
    let message = '';
    if(code) message = `Connecting to server failed: ${code}`;
    else message = 'API gateway server offline';

    return message;
}

export function showModal() {
    const modal = document.getElementById('modal');
    if(modal) modal.setAttribute('style', 'display: flex;');
}

export function hideModal() {
    const modal = document.getElementById('modal');
    if(modal) modal.setAttribute('style', 'display: none;');
}
