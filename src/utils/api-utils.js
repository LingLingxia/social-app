

const handleResponse = async (response)=>{
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || "Something went wrong");
    }
    return {
        success: true,
        data,
        message:""
    }
}

const handleError = (error)=>{
    return {
        success:false,
        message: error.message || "Something went wrong",
        data:null
    }
}

export const get = async (url)=>{
    try {
        const response = await fetch(url,{
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        return handleResponse(response);
    } catch(error){
        return handleError(error);
    }
}

export const post = async (url,data)=>{
    try {
        const response = await fetch(url,{
            method: "POST",
            headers:{
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response)
    }catch(err){
        return handleError(err)
    }
}

export const put = async(url,data)=>{
    try{
        const response = await fetch(url,{
            method:"PUT",
            headers:{
                'Content-Type':"application/json",
            },
            body:JSON.stringify(data)
        })
        return handleResponse(response)
    }catch(err){
        return handleError(err)
    }
}

export const remove = async (url)=>{
    try{
        const response = await fetch(url,{
            method:'DELETE',
            headers:{
                "Content-Type":"application/json",
            },
        })
        return handleResponse(response)
    }catch(err){
        handleError(err)
    }
}

export const upload = async(url,data)=>{
    try{
        const response = await fetch(url,{
            method:"POST",
            body:data
        })
        return handleResponse(response)

    }catch(err){
        return handleError(err)
    }
}