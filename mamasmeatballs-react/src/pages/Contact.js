import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <>
      <h2>Contact Us</h2>
      <p>Have questions or feedback? We'd love to hear from you!</p>
      
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your name" required />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Your email" required />
        
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" placeholder="Your message" required></textarea>
        
        <button type="submit">Send</button>
      </form>
      
      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>Jonah Mosquera</p>
        <p>Email: mosquerj@email.sc.edu</p>
        <p>Phone: XXX-XXXX-XXXX</p>
      </div>
    </>
  );
}

export default Contact;
