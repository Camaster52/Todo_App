const SendFeedback = async ({ problem , name }) => {

    try{
        const response = await fetch("http://localhost:8080/api/feedback" , {
            method: "POST",
            headers: {'Content-Type': 'application/json' , 'Accept': 'application/json'},
            body: JSON.stringify({problem: problem , name: name})
        })

        const result = await response.json()

        if(!response.ok){
            throw new Error("Server error: " , response.status)
        }

        console.log("Success feedback: " , result)
        return { success: true }
    }catch(error){
        console.error("Error: ", error.message)
        throw error
    }
}
export default SendFeedback