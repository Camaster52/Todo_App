
const LogOut = async () => {
    localStorage.clear()
    const apiUrl = process.env.REACT_APP_API_URL
    try{
        const response = await fetch(`${apiUrl}/api/logout` , {
            method: "POST" , 
            headers: { "Content-Type" : "application/json" },
            credentials: "include"
        })

        const result = await response.json()

        if(!response.ok){
            console.error("Server error: " , result.message)
            throw new Error(result.message)
        }

        console.log("Success logout: " , result)
        return {
            success: true,
            result: result
        }
    }catch(error){
        console.error("Fetch error: " , error)
        return{
            success: false
        }
    }
    
}
export default LogOut