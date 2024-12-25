// export const formatDate = (dateString: string): string =>{
    
//     const date = new Date(dateString)
//     const options = {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//     }
//     return date.toLocaleDateString('ua-Us', options)
// }

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    // Замінюємо "Р." на "р."
    return date.toLocaleDateString('uk-UA', options).replace('р.', '');
};