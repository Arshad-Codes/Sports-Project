
export const isAdmin = ()=>{
    const currentUser = localStorage.getItem('currentUser');
    const token = document.cookie
    console.log('Token: ', currentUser);
    if (!token){ 
        console.log('No token found'); 
        return false;}
    if(!currentUser) {
        console.log('No user found');
        return false;}
    if (currentUser.role === 'admin') return true;
    console.log('Not an admin');
    return false;
}