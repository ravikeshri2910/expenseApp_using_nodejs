const submit = document.getElementById('submit')
    submit.addEventListener("click",updatePassword)

    async function updatePassword(e){
        e.preventDefault()

        const npass = document.getElementById('newpassword').value

        const obj = {
            npassword : npass
        }

        const res = await axios.post("http://3.80.172.222:3000/password/updatePassword",obj)

        console.log(res)

    }