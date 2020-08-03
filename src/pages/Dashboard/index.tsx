import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories } from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  return (
  <>
    <img src={logoImg} alt="Github Explorer"/>
    <Title>Explore repositórios no Github.</Title>

    <Form>
      <input placeholder="Digite o nome do repositório" />
      <button type="submit" >Pesquisar</button>
    </Form>

    <Repositories>
      <a href="#">
        <img 
        src="https://avatars3.githubusercontent.com/u/32224862?s=460&u=ca26d03b8d0b949e3f141d15bead69fb101a571a&v=4" 
        alt="Gustavo Morini"/>
        <div>
          <strong>teste-captcha</strong>
          <p>teste google-recaptcha reactJS</p>
        </div>
        <FiChevronRight size={20} />
      </a>          
    </Repositories>

  </>
  )
}

export default Dashboard;