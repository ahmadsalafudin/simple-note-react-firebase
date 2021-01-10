import { Component, React } from 'react'
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import { loginUserAPI } from '../../../config/redux/action';
import './login.scss';

class Login extends Component {
    state = {
        email : '',
        password : ''
    }

    handleChangetext = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleLoginSubmit = async () => {
        const {email, password} = this.state
        const { history } = this.props
        const res = await this.props.loginAPI({email, password}).catch(err => err)
        if (res) {
            localStorage.setItem('userData', JSON.stringify(res))
            this.setState({
                email : '',
                password : ''
            })
            history.push('/')
        } else {
            console.log('login failed')
            this.setState({
                email : '',
                password : ''
            })
        }
    }

    render(){
        return(
            <div className='auth-container'>
                <div className='authCard'>
                    <p className='auth-title'>Login</p>
                    <input className='input' id='email' placeholder='Email' type='email' onChange={this.handleChangetext} value={this.state.email} />
                    <input className='input' id='password' placeholder='Password' type='password' onChange={this.handleChangetext}  value={this.state.password}/>
                    <Button onClick={this.handleLoginSubmit} title='Login' loading={this.props.load}/>
                </div>
            </div>
        )
    }
}
const reduxState = (state) => ({
    load : state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI : (data) => dispatch(loginUserAPI(data))
})
export default connect(reduxState, reduxDispatch) (Login)