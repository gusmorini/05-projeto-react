import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Header, RepositoryInfo, Issues } from './styles';
import Logo from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  console.log(params);
  return (
    <>
      <Header>
        <img src={Logo} alt="Github Explorer"/>
        <Link to="/" ><FiChevronLeft size={16} /> voltar</Link>
      </Header>
      <RepositoryInfo>
        <header>
          <img src="https://avatars0.githubusercontent.com/u/28929274?v=4" alt="rocketseat"/>
          <div>
            <strong>rocket</strong>
            <p>descrição</p>
          </div>
        </header>
        <ul>
            <li>
              <strong>1800</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>1800</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>1800</strong>
              <span>Stars</span>
            </li>
          </ul> 
      </RepositoryInfo>
      <Issues>
        <Link to={`sdfsdf`}>
          <div>
            <strong>sdf</strong>
            <p>sdf</p>
          </div>
          <FiChevronRight size={20} />
        </Link> 
      </Issues>
    </>
  )
}

export default Repository;