import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as yup from 'yup';
import axios from 'axios';

const UserForm = ({errors, touched, status}) => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        if(status){
        setUsers([...users, status])
    }
    }, [status])

    return (
        <div>
        <Form>
            {touched.name && errors.name && <p className = "error">{errors.name}</p>}
            <Field type = "text" className = "field" name = "name" placeholder = "Name" />

            {touched.email && errors.email && <p className = "error">{errors.email}</p>}
            <Field type = "text" className = "field" name = "email" placeholder = "Email" />

            {touched.password && errors.password && <p className = "error">{errors.password}</p>}
            <Field type = "password" className = "field" name = "password" placeholder = "Password" />

            {touched.terms && errors.terms && <p className = "error">{errors.terms}</p>}
            <label>
                <Field type="checkbox" name="terms" />
                <span>Agree to Terms of Service</span>
            </label>
            <button type = "submit">Submit</button>

            
        </Form>
        <div>
            {users.map ( user => (
            <p>My name is {user.name}. Please contact me via email {user.email}.</p>
        ))}
        </div>  
        </div>
    )
}

export default withFormik ({
    mapPropsToValues: (values) =>{
        return {
            name: values.name || "",
            email: values.email || "",
            password: values.password || "",
            terms: values.terms || false
        }
    },

    validationSchema: yup.object().shape({
        name: yup
            .string()
            .required("Name is required!"),
        email: yup
            .string()
            .email()
            .required("Please enter your password"),
        password: yup
            .string()
            .min(8)
            .required("You need it!"),
        terms: yup
            .boolean()
            .oneOf([true], 'Sorry, you have to accept it')
    }),

    handleSubmit: (values, {setStatus}) => {
        axios.post ("https://reqres.in/api/users", values)
        .then ((res) =>{
            setStatus(res.data);
            // console.log(res)
        })
        .catch ((err) => {
            console.log(err)
        })
        
    }
})(UserForm)