import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegistrationPage = () => {

    const initialFormData = ({
        name: '',
        nameUpper: '',
        phoneNo: '',
        whatsappNo: '',
        email: '',
        gender: '',
        age: ''
    });


    const [formData, setFormData] = useState(initialFormData);

    const formDataWithDefaults = {
        ...formData,
        CountryCode: "IN",
        AgeUnit: "Y"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            ...(name === 'name' && { nameUpper: value.toUpperCase() }) 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(
                '/api/sap/opu/odata/sap/ZCDS_C_TEST_REGISTER_NEW_CDS/ZCDS_C_TEST_REGISTER_NEW',
                formDataWithDefaults ,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );
            
            console.log('Registration successful:', response.data);
            alert('Registration successful!');
            setFormData(initialFormData); 
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Failed to register. Please try again.');
        }

        /* console.log(formDataWithDefaults);
        setFormData(initialFormData); */
    };
    

    return (
        <Form className='w-96' onSubmit={handleSubmit}>
             <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" name='name' value={formData.name} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="phoneno">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone No" name='phoneNo' value={formData.phoneNo} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="whatsappno">
                <Form.Label>What's App No.</Form.Label>
                <Form.Control type="text" placeholder="Enter What's App No" name='whatsappNo' value={formData.whatsappNo} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" name='email' value={formData.email} onChange={handleChange}/>
            </Form.Group>


            <Form.Group className="mb-3" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select name='gender' value={formData.gender} onChange={handleChange}>
                    <option>Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Age</Form.Label>
                <Form.Control type="text" placeholder="Enter Age" name='age' value={formData.age} onChange={handleChange}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default RegistrationPage;
