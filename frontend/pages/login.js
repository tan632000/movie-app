import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = (e) => {
        e.preventDefault()
        axiosClient.post('/auth/signin', {
          email,
          password
        }).then((data) => {
          if (data.status === 200) {
            const user = data.data.payload.user;
            cookie.set('token_rgs_pt', data.data.payload.token, { expires: 1 })
            localStorage.setItem('user_id', JSON.stringify(user._id))
            router.push('/');
          }
        })
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }


    return (
        <div>AAAA</div>
    )
}

export default Login;