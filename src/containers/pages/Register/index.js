import { Component, React } from 'react';
import './register.scss';
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import { registerUserAPI } from "../../../config/redux/action";

class Register extends Component {
    state = {
        email : '',
        password : ''
    }

    handleChangetext = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleRegisterSubmit = async () => {
        const {email, password} = this.state
        const { history } = this.props
        const res = await this.props.registerAPI({email, password}).catch(err => err)
        if (res) {
            this.setState({
                email : '',
                password : ''
            })
            history.push('/login')
        } else {
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
                    <p className='auth-title'>Register</p>
                    <input className='input' id='email' placeholder='Email' type='email' onChange={this.handleChangetext} value={this.state.email} />
                    <input className='input' id='password' placeholder='Password' type='password' onChange={this.handleChangetext}  value={this.state.password}/>
                    <Button onClick={this.handleRegisterSubmit} title='Register' loading={this.props.load}/>
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    load : state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI : (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch) (Register)