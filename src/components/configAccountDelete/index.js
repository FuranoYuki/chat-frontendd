//react
import React from 'react';

//style
import './styles.css';
//form
import {useForm} from 'react-hook-form';
//api
import api from '../../services/http/api';
//token
import { logout } from '../../services/auth';
//router
import {useHistory} from 'react-router-dom';

const ConfigAccountDelete = () => {

    //form
    const {register, handleSubmit} = useForm();

    //router
    const history = useHistory();

    //functions
    const showModal = () => {
        document.querySelector('.configDel-modal').style.display = 'flex'
    }

    const hideModal = () => {
        document.querySelector('.configDel-modal').style.display = 'none'
    }

    const verifyModal = (event) => {
        if(event.target === event.currentTarget){
            hideModal();
        }
    }

    const deleteAccount = (data) => {
        const {password} = data;
        
        if(password.length < 6){
            document.querySelector('.configDel-password-incorrect').style.display = 'inline'
        }else{
            document.querySelector('.configDel-password-incorrect').style.display = 'none'
        }

        if(password.length >- 6){
            api.post('/user/deleteAccount', {password})
            .then(() => {
                logout();
                history.push('/login')
            })
            .catch(error => {
                if(error.response.data === 'failed at deleteAccount, password incorrect'){
                    document.querySelector('.configDel-password-incorrect').style.display = 'inline'
                }
            })
        }
    }

    return(
        <>
            <div className="config-accDel">
                <div className="config-accDel-header">
                    ACCOUNT REMOVAL
                </div>
                <p>
                    Disabling your account means you can recover
                    it at any time after taking this action.
                </p>
                <div className="config-accDel-btns">
                    <button 
                        onClick={showModal}
                        className="config-accDel-btns-Disable"
                    >
                        Disable Account
                    </button>
                    <button 
                        onClick={showModal}
                        className="config-accDel-btns-Delete"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
            
            <div 
                className="configDel-modal"
                onClick={verifyModal}
            >
                <form 
                    onSubmit={handleSubmit(deleteAccount)}
                    className="configDel-modal-form"
                >
                    <div className="configDel-modal-form-body">
                        <div className="configDel-modal-form-body-header">
                            DELETE ACCOUNT
                        </div>
                        <p className="configDel-modal-form-body-text">
                            Are you sure that you want to delete your account? 
                            This will immediately log you out of your account and
                            you will not be able to log in again.
                        </p>
                        <div className="configDel-modal-form-body-field">
                            <label>
                                password
                                <span className="configDel-password-incorrect">
                                    password incorrect
                                </span>
                            </label>
                            <input 
                                className="configDel-modal-form-body-field-input" 
                                name="password"
                                type="password"
                                ref={register}
                            />
                        </div>
                    </div>
                    <div className="configDel-modal-form-buttons">
                        <button 
                            onClick={hideModal}
                            className="configDel-modal-form-button cancel"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button 
                            className="configDel-modal-form-button delete"
                            type="submit"
                        >
                            Delete Account
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ConfigAccountDelete