import { useState } from 'react';

import FormInput from '../form-input/form-input.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: '',
  name: '',
  address: '',
};

const SignInForm = ({ items, amount }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, name, address } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(items, amount)

    const data = {
      user: { email, name, address },
      amount: amount,
      products: items
    }

    console.log(data)
    try {
      await fetch("http://localhost:8080/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        const response = await res.json();
        console.log(response)
        if (response.message === "Pedido recebido com sucesso!") {
          alert('Compra realizada com sucesso, logo você receberá uma confirmação pelo seu email!');
        }
      });

      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <SignInContainer>
        <h2>Ainda não é um usuario?</h2>
        <span>Entre com suas informações</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Nome'
            type='text'
            required
            onChange={handleChange}
            name='name'
            value={name}
          />

          <FormInput
            label='Email'
            type='email'
            required
            onChange={handleChange}
            name='email'
            value={email}
          />

          <FormInput
            label='Senha'
            type='password'
            required
            onChange={handleChange}
            name='password'
            value={password}
          />

          <FormInput
            label='Endereço'
            type='text'
            required
            onChange={handleChange}
            name='address'
            value={address}
          />
          <ButtonsContainer>
            <button className='btn btn-dark' type='submit'>Confirmar</button>
          </ButtonsContainer>
        </form>
      </SignInContainer>
    </>);
};

export default SignInForm;
