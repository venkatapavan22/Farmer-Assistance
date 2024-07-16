import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { LuSend } from "react-icons/lu";
import ContactBg from '../../assets/main/contact.png'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        tel: ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const showSnackbar = (message) => {
        setSnackbar({
            open: true,
            message,
        });
        setTimeout(() => {
            setSnackbar({
                open: false,
                message: '',
            });
        }, 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs
            .sendForm('service_v4iuenm', 'template_nap2uv6', e.target, 'kpyEI3k4KZKSecI54')
            .then((response) => {
                console.log('Email sent successfully:', response);
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                    tel: ''
                });
                showSnackbar('Email sent successfully!');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                showSnackbar('Error sending email. Please try again.');
            });
    };

    return (
        <div className="flex flex-col justify-center sm:flex-row bg-white py-8">
            <div className="flex-col py-8 flex justify-center rounded-md md: flex-row">
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-tl-2xl rounded-bl-2xl ">
                    <h2 className="text-gray-700 font-semibold text-center text-2xl mb-4">Get In Touch</h2>
                    <div className="mb-4">
                        <label htmlFor="name" className="flex items-center gap-1 text-md font-medium text-gray-700"><FaRegUser /> Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder='Enter Your Name' className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-teal-500"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="flex items-center gap-1 text-md font-medium text-gray-700"><HiOutlineMail /> Email Address </label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email address' required className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-teal-500"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tel" className="flex items-center gap-1 text-md font-medium text-gray-700"><FiPhoneCall /> Contact No </label>
                        <input type="tel" id="tel" name="tel" value={formData.tel} onChange={handleChange} required placeholder='Contact No' className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-teal-500"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="flex items-center gap-1 text-md font-medium text-gray-700"><AiOutlineMessage /> Your Message </label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder='Your Message' rows="4" className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-teal-500"></textarea>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="w-1/2 flex justify-center items-center gap-1 text-white bg-light-green hover:bg-dark-green focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-2"><LuSend /> Send</button>
                    </div>
                    {snackbar.open && (
                        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded">
                            {snackbar.message}
                        </div>
                    )}
                </form>
                <div className='w-1/3 h-auto bg-dark-green rounded-tr-2xl rounded-br-2xl '>
                    <img src={ContactBg} alt="contact" className='items' />
                </div>
            </div>
            
        </div>
    );
};

export default Contact;
