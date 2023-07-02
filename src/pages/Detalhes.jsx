import './Detalhes.css'
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChakraProvider, Box, Text, Spinner, Button } from '@chakra-ui/react';


const Desc = ({card}) => {

    const [cardDetalhes, setCardDetalhes] = useState()
    const [carregar, setCarregar] = useState(false);
    const { id } = useParams();

    const fetchCardDetalhes = useCallback(async () => {
        try {
            setCarregar(true);
            const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
            const jsonData = response.data;
            setCardDetalhes(jsonData.data);
        } catch (error) {
            console.log('Ocorreu um erro:', error);
        } finally {
            setCarregar(false);
        }
    }, [id]);
    
    const navigate = useNavigate();
    const navigateToBack = () => {
            navigate(-1)
    }

    const renderCardDetalhes = () => {
            if (carregar || !cardDetalhes?.length) {
                return (
                <div className='loading'>
                    <h3 className='loadingFont'>Carregando:</h3>
                    <div className='spinner'><Spinner size='xl' color='#000' /></div>
                </div>
                );
            }
            return (
                <div>
                    {cardDetalhes && (
                        <Box className='BoxDetalhes'>
                            <Box>
                                <img className='imgDetalhes' src={`https://images.ygoprodeck.com/images/cards/${id}.jpg`} alt={cardDetalhes[0].name} />
                            </Box>
                            <Box>
                                <Text className='detalhesCss'><b>Nome:</b> {cardDetalhes[0].name}</Text>
                                <Text className='detalhesCss'><b>Tipo:</b> {cardDetalhes[0].type}</Text>
                                <Text className='detalhesCss'><b>Tipo de Carta:</b> {cardDetalhes[0].frameType}</Text>
                                <Text className='detalhesCss'><b>Raça:</b> {cardDetalhes[0].race}</Text>
                                <Text className='detalhesCss'><b>Arquétipo:</b> {cardDetalhes[0].archetype}</Text>
                                <Text className='detalhesCssDesc'><b>Descrição:</b> {cardDetalhes[0].desc}</Text>
                            </Box>                        
                            
                        </Box>
                    )}
                </div>
            )
    }

      useEffect(() => {
        fetchCardDetalhes()
      }, [fetchCardDetalhes]);

    return (
        <ChakraProvider>
            <div className='backgroundDetalhes'>
                <Button _hover='#000' bg='#000' color='#FFF' onClick={navigateToBack} className='botao'>Voltar</Button>
                {renderCardDetalhes()}
            </div>
        </ChakraProvider>
    );
}

export default Desc;