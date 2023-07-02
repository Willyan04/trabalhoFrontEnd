import './Lista.css'
import axios from 'axios';
import { SimpleGrid, Box, Button, Spinner, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Listagem = () => {

  const [Data, setData] = useState();
  const [carregar, setCarregar] = useState(false);
  const [page, setPage] = useState(0);

  const botao = () => {
    if (page != 0) {
      return (
        <div className='buttons'>
          <Button _hover='#000' bg='#000' color='#FFF' border='2px' borderColor='#FFF' onClick={clickProximaPagina}>Próxima Pagina</Button>
          <Button _hover='#000' bg='#000' color='#FFF' border='2px' borderColor='#FFF' onClick={clickPaginaAnterior} disabled={page === 0}>Pagina Anterior</Button>
        </div>
      );
    }
    return (
      <div className='buttons'>
          <Button _hover='#000' bg='#000' color='#FFF' border='2px' borderColor='#FFF' onClick={clickProximaPagina}>Next Page</Button>
        </div>
    );
  };

  const fetchData = useCallback(async () => {
    try {
      setCarregar(true);
      const api = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=10&offset=${page * 49}`);
      const conversao = api.data;
      setData(conversao.data);
    } catch (error) {
      console.log('Ocorreu um erro:', error);
    } finally {
      setCarregar(false);
    }
  }, [page]);

  const clickPaginaAnterior = () => {
    if (page > 0) {
      setPage(pages => pages - 1);
    }
  };

  const clickProximaPagina = () => {
    setPage(pages => pages + 1);
  };

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const renderData = () => {
    if (carregar || !Data?.length) {
      return (
        <div className='loading'>
          <h3 className='loadingFont'>Carregando</h3>
          <div className='spinner'><Spinner size='xl' color='#000' /></div>
          
        </div>
      );
    }
    return (
      <div>
        {botao()}
        <div className='coluna'>
            {Data.map((carta) => (
              <Box className='carta' key={carta.id}>
                <Link to={`/detalhes/${carta.id}`}><img src={carta.card_images[0].image_url} alt={carta.name} /></Link>
              </Box> 
            ))}
        </div>
      </div>
    );
  };


  return (
      <div className='background'>
        <header className='header'>
          
        </header>
        <div className='body'>
          <div className='header'>
            <Text fontSize='3xl' color='#000'>Lista de Cartas: </Text>
          </div>
          {renderData()}
        </div>
      </div>
  );
}

export default Listagem;