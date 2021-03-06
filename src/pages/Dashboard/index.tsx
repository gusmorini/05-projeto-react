import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';
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

  const STORAGE_NAME = '@githubExplorer:repositories';

  // carrega os repostitórios do localstorage
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storage = localStorage.getItem(STORAGE_NAME);

    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
  });

  // altera o local storage sempre que a variavel repositories for alterada
  useEffect(() => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(repositories));
  }, [repositories])


  const [inputError, setInputError] = useState('');

  const [newRepo, setNewRepo] = useState('');


  async function handleAddRepository (event: FormEvent<HTMLFormElement>):Promise<void> {
    event.preventDefault();

    if(!newRepo) {
      return setInputError('Digite o autor/nome do repositório');
    }

    try {
      const search = newRepo.replace(/\s/g, '');
      const response = await api.get<Repository>(`repos/${search}`);
      
      if (response.data) {
        const repository = response.data;
        setRepositories([...repositories, repository]);
        setNewRepo('');
        setInputError('');
      } 
    } catch (err) {
      return setInputError('Erro na busca por esse repositório');
    }
  }

  return (
  <>
    <img src={logoImg} alt="Github Explorer"/>
    <Title>Explore repositórios no Github.</Title>

    <Form hasError={!!inputError} onSubmit={handleAddRepository}>
      <input 
        type="text"
        name="repository"
        value={newRepo}
        onChange={e => setNewRepo(e.target.value)}
        placeholder="Digite o nome do repositório" 
      />
      <button type="submit" >Pesquisar</button>
    </Form>

    <Error>{ inputError && inputError }</Error>

    <Repositories>
      {repositories.map(repository => (
        <Link key={repository.id} to={`/repository/${repository.full_name}`}>
          <img 
          src={repository.owner.avatar_url}
          alt={repository.owner.login}/>
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
          <FiChevronRight size={20} />
        </Link> 
      ))}         
    </Repositories>

  </>
  )
}

export default Dashboard;