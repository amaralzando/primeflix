import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './home.css';

function Home() {
  const [filtroFilme, setFiltroFilme] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFilmes();
  }, [paginaAtual]);

  const loadFilmes = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (filtroFilme === '') {
        response = await api.get("movie/popular", {
          params: {
            language: 'pt-BR',
            page: paginaAtual,
          }
        });
      } else {
        response = await api.get("search/movie", {
          params: {
            query: filtroFilme,
            language: 'pt-BR',
            page: paginaAtual,
          }
        });
      }

      setFilmes(response.data.results);
    } catch (err) {
      setError("Ocorreu um erro ao carregar os filmes. Tente novamente mais tarde.");
    }

    setLoading(false);
  }

  const handleProximaPagina = () => {
    setPaginaAtual(paginaAtual + 1);
  }

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  }

  const handleLimparFiltro = () => {
    setFiltroFilme('');
    setPaginaAtual(1);
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className='filtro-filmes'>
        <input
          value={filtroFilme}
          placeholder='Insira o nome do filme'
          onChange={e => setFiltroFilme(e.target.value)}
        />
        <button onClick={handleLimparFiltro}>Limpar</button>
        <button onClick={loadFilmes}>Procurar</button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="pagination">
        <button onClick={handlePaginaAnterior} disabled={paginaAtual === 1}>Anterior</button>
        <span>{paginaAtual}</span>
        <button onClick={handleProximaPagina}>Próxima</button>
      </div>
      <div className="lista-filmes">
        {filmes.map((filme) => (
          <article key={filme.id} className="item-filme">
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
            <Link to={`/filme/${filme.id}`}>Acessar</Link>
            <strong>{filme.title}</strong>
          </article>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePaginaAnterior} disabled={paginaAtual === 1}>Anterior</button>
        <span>{paginaAtual}</span>
        <button onClick={handleProximaPagina}>Próxima</button>
      </div>
    </div>
  )
}

export default Home;
