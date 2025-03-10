// import React from 'react';
// import Swal from 'sweetalert2';

// const Contact = () => {

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     formData.append("access_key", "0fd0846e-c296-4390-a751-92058dde91f2");

//     const object = Object.fromEntries(formData);
//     const json = JSON.stringify(object);

//     const res = await fetch("https://api.web3forms.com/submit", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//       body: json
//     }).then((res) => res.json());

//     if (res.success) {
//       Swal.fire({
//         title: "Success",
//         text: "Message sent successfully!",
//         icon: "success"
//       });
//     }
//   };

//   return (
//     <div className="contact-page">
//       <h1>Contact-us</h1>
//       <section className="contact-container">
//         <form onSubmit={onSubmit} className='contact-form'>
//             <h2>Contact Form</h2>
//             <div className='input-box'>
//                <label>Full Name</label>
//                <input type='text' className='field' placeholder='Enter your name' name='name' required />
//             </div>
//             <div className='input-box'>
//                <label>Emal Adress</label>
//                <input type='email' className='field' placeholder='Enter your email' name='email' required />
//             </div>
//             <div className='input-box'>
//                <label>Message</label>
//              <textarea name='message'  className='mess' placeholder='Enter your message' required></textarea>
//             </div>
//             <button type='submit'>Send your message</button>
//         </form>
       
//       </section>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
  // Estados para armazenar os valores dos inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    // Criar o objeto FormData
    const formData = new FormData();
    formData.append("access_key", "0fd0846e-c296-4390-a751-92058dde91f2");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Enviar a requisição
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    // Verificar se o envio foi bem-sucedido
    if (res.success) {
      Swal.fire({
        title: "Success",
        text: "Message sent successfully!",
        icon: "success"
      });

      // Limpar os campos do formulário
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="contact-page">
      {/* <h1>Contact-us</h1> */}
      <section className="contact-container">
        <form onSubmit={onSubmit} className='contact-form'>
          <h2>Contact Us</h2>
          <div className='input-box'>
            <label>Full Name</label>
            <input
              type='text'
              className='field'
              placeholder='Enter your name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label>Email</label>
            <input
              type='email'
              className='field'
              placeholder='Enter your email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label>Message</label>
            <textarea
              name='message'
              className='mess'
              placeholder='Enter your message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type='submit'>Send your message</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;