export const authenticate = (data : object) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('current-user', JSON.stringify(data))
    }
}

export const isAuthenticate = () => {
    if(typeof window === 'undefined') return false;
    if(localStorage.getItem('current-user') ) {
        return JSON.parse(localStorage.getItem('current-user') as string);
    }
    else {
        return false;
    }
}