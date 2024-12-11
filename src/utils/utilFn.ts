export const getUrlParams = (url:string)=>{
    try {
        const Url = new URL(url);
        const params: URLSearchParams = new URLSearchParams(Url.search);
        return params;
    } catch (error) {
        console.error('Error:', error);
        return new URLSearchParams("")
    }
}