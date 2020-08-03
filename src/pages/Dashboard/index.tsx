import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import { Title, Form, Repositories } from './styles';
import logoImg from '../../assets/logo.svg';

interface Repository {
  id: number;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {

  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository (event: FormEvent<HTMLFormElement>):Promise<void> {
    event.preventDefault();

    const search = newRepo.replace(/\s/g, '');
    const response = await api.get<Repository>(`repos/${search}`);
    
    if (response.data) {
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo('');
    } 
  }

  return (
  <>
    <img src={logoImg} alt="Github Explorer"/>
    <Title>Explore repositórios no Github.</Title>

    <Form onSubmit={handleAddRepository}>
      <input 
        type="text"
        name="repository"
        value={newRepo}
        onChange={e => setNewRepo(e.target.value)}
        placeholder="Digite o nome do repositório" 
      />
      <button type="submit" >Pesquisar</button>
    </Form>

    <Repositories>
      {repositories.map(repository => (
        <a key={repository.id} href="#">
          <img 
          src={repository.owner.avatar_url}
          alt={repository.owner.login}/>
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
          <FiChevronRight size={20} />
        </a> 
      ))}         
    </Repositories>

  </>
  )
}

export default Dashboard;