import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Share2 } from 'lucide-react';

// Mock data - substitua pelos seus dados reais
const mockArticle = {
  id: 1,
  slug: 'artigo-exemplo',
  title: 'Como Criar Aplicações React Responsivas',
  summary: 'Um guia completo para desenvolver aplicações que se adaptam a qualquer dispositivo',
  author: 'João Silva',
  date: '2023-05-15',
  category: 'Desenvolvimento',
  content: `
    <p style="text-align: left"><span style="font-family: Arial, sans-serif">“Quando os bombeiros chegam, nós, brigadistas, já contemos o fogo. E isso porque eles estão sendo pagos” - É com essa fala que Lucas Tumporuvichá, líder da brigada indígena no Pico do Jaraguá, evidencia a importância do trabalho voluntário dos brigadistas no combate às queimadas que ocorrem no território.</span></p><div src="https://storage.googleapis.com/portal-sini.firebasestorage.app/images/1745600189812_box pequeno comeÃ§o.png" alt="Imagem com texto" align="left" data-type="image-with-text" data-align="left"><img src="https://storage.googleapis.com/portal-sini.firebasestorage.app/images/1745600189812_box pequeno comeÃ§o.png" alt="Imagem com texto" loading="lazy"><div class="content"><p style="text-align: left"><span style="font-family: Arial, sans-serif">Em agosto de 2024, o número de focos de incêndio em São Paulo superou 888,64% comparado ao mesmo período do ano anterior. Apesar da crescente, o número de brigadistas que atuam no combate ao fogo tem diminuído gradativamente, em decorrência da não remuneração e da invisibilidade do serviço.</span></p></div></div><p style="text-align: left"><span style="font-family: Arial, sans-serif">A Terra Indígena Guarani Mbya, no Jaraguá, zona norte de São Paulo, tradicionalmente ocupada e recentemente regularizada, tem uma área de 1,73 hectares – o equivalente a 4 campos de futebol - e uma população de 586 pessoas, dos povos Guarani Mbya e Guarani Ñandeva. O grupo atua no resgate às tradições e culturas do povo indígena, além de um grande papel na preservação da mata atlântica e na defesa de direitos territoriais e civis, atua na luta contra as queimadas no parque estadual do Jaraguá.</span></p><p style="text-align: left"><span style="font-family: Arial, sans-serif">A brigada para combater os incêndios que ocorrem no território surgiu em 2019, em uma conversa de Gustavo Lopes, gestor do parque, com a Fundação Florestal e as aldeias indígenas do Jaraguá. A iniciativa trata-se de um trabalho voluntário, onde todos estão ali por um motivo maior: a preservação das terras. Os participantes foram treinados para agir em casos de incêndio, além de receber, do governo estadual de São Paulo, os equipamentos de proteção individuais.</span></p><p style="text-align: left"><span style="font-family: Arial, sans-serif">No início, o grupo era composto por 40 brigadistas, entre indígenas e funcionários, homens e mulheres do Parque Estadual do Jaraguá. Atualmente, é formado por doze integrantes, tendo uma única mulher na equipe, Sonia Ara Mirim.&nbsp;</span></p><p style="text-align: left"><span style="font-family: Arial, sans-serif">O grupo já havia atuado em diversos casos onde as chamas acometiam o território do parque. Mas, na noite de 27 de abril de 2024, um sábado, eles tiveram que lutar contra o maior incêndio da história daquela área. O fogo começou por volta das 21h e foi controlado na madrugada do domingo. “É um sentimento muito ruim, você saber que um bem que você estava protegendo, guardando, sumiu, foi destruído, ainda mais criminosamente” comentou Lucas Tumporuvichá. O incêndio atingiu mais de três hectares do parque, o equivalente a três campos de futebol. O laudo pericial indicou a queda de um balão como causa provável.&nbsp;</span></p><img style="max-width: 500px; height: auto;" src="https://storage.googleapis.com/portal-sini.firebasestorage.app/images/1745434066497_Sem TÃ­tulo-2.jpg"><p style="text-align: center">Reprodução/TV Globo</p><p style="text-align: center"></p><p style="text-align: left"><span style="font-family: Arial, sans-serif">No ano de 2024, segundo dados divulgados pelo Instituto de Pesquisa Ambiental da Amazônia (IPAM), o Brasil teve cerca de 11 milhões de hectares queimados. Comparado a um levantamento feito ano passado, as queimadas do começo de 2024 até então tiveram um aumento de 116%.&nbsp;</span></p><p style="text-align: left"><span style="font-family: Arial, sans-serif">Grande parte dos focos de incêndio ocorreram em áreas rurais de grande porte. No entanto, o maior aumento ocorreu nas florestas públicas não destinadas, onde foi identificada uma alta de 176% na área afetada pelo fogo, com cerca de 870 mil hectares, o equivalente a 8.700.000.000m², queimados apenas neste ano. Com um aumento significativo das queimadas e em maior preocupação, as terras indígenas também foram assoladas com três milhões de hectares queimados - número que equivale a 4.200.000 campos de futebol -, o que representa uma crescente de 80% em relação ao ano de 2023, de acordo com organizações que compõem a Rede Mapbiomas e o portal de notícia CNN Brasil, em 27 de setembro.</span></p><p style="text-align: left"><span style="font-family: Arial, sans-serif"><strong>Mapbioma Brasil: projeto que mapeia a cobertura e o uso da Terra no Brasil, e monitora as mudanças do território</strong></span></p><p style="text-align: left"><span style="font-family: Arial, sans-serif">A cada pesquisa, a cada click em notícias, a cada estatística disseminada, as florestas da amazônia, territórios do cerrado, biomas da mata atlântica e pantanal e terras de propriedade indígena, são queimados e apagados da natureza e patrimônio brasileiro. Notícias mais recentes demonstram o aumento dos incêndios florestais (muitas das vezes criminosos) neste ano. Elaborado pelo Mapbiomas, segundo dados do monitor do fogo, a área queimada no Brasil em outubro é equivalente, aproximadamente, ao território do país da costa rica, atingindo quase 52 mil km² de devastação em fogo.&nbsp;</span></p><p style="text-align: left"><span style="font-family: Arial, sans-serif">Apesar da necessidade de proteger terras, em dado momento são obrigados a escolher dois caminhos, entre o trabalho voluntário ou trabalho remunerado. Esse é o caso de Sonia Ara Mirim, ativista e brigadista ambiental que atua, também, como Mestre dos Saberes no Museu das Culturas Indígenas.</span></p><p style="text-align: left"><span style="font-family: Arial, sans-serif">Sonia é membro da brigada há 4 anos e é considerada uma das coisas mais importantes na preservação da vida e da floresta, por isso não teve outra escolha que não fosse atuar em uma jornada dupla, equilibrando emprego remunerado com o serviço de brigadista florestal. “Quando se fala sobre o meio ambiente, que a gente já fala sobre proteção, foi uma das formas que eu achei de proteger aquele território, e por isso que eu não desisti. Eu vou continuar, mesmo sem nenhum recurso. Eu vou continuar independente do que for, eu ainda vou continuar na brigada” – relata a brigadista em entrevista.</span></p><p style="text-align: left"></p><div src="https://storage.googleapis.com/portal-sini.firebasestorage.app/images/1745524782860_box matÃ©ria brigadistas.png" alt="Imagem com texto" align="right" data-type="image-with-text" data-align="right"><img src="https://storage.googleapis.com/portal-sini.firebasestorage.app/images/1745524782860_box matÃ©ria brigadistas.png" alt="Imagem com texto" loading="lazy"><div class="content"><p style="text-align: left">Os brigadistas têm seu trabalho invisibilizado tanto pela sociedade, que não é informada sobre a importância deles, quanto pelo governo, que não destina os suprimentos essenciais para o combate ao fogo. “Faz uns 4 ou 5 anos, mais ou menos que a gente foi na Fundação Florestal pedir uma caminhonete. A gente está esperando até hoje. A gente não tem protetor de nuca, não tem protetor de canela para a mordida de animal, não tem lanterna de capacete, enfim, não temos muita coisa” - informa Sonia - “Tem agora um projeto de lei da Célia Xakriabá, uma das nossas deputadas federais. Por causa de tudo o que aconteceu no país durante esses tempos, quem estava na linha de frente eram os brigadistas. Eles que vão para os piores lugares. Os bombeiros não vão, aí parece que ela vai regulamentar nós, brigadistas, para começar a receber como bombeiro militar. Os brigadistas deveriam ganhar toda a proteção, todo o equipamento”.</p></div></div><p style="text-align: left"><span style="font-family: Arial, sans-serif">&nbsp;</span></p><p style="text-align: left"></p><img style="max-width: 500px; height: auto;" src="https://storage.googleapis.com/portal-sini.firebasestorage.app/images/1745433736530_image_processing20240428-2964084-yycfku-750x536.webp"><p style="text-align: center">Reprodução/Mídia Guarani Mbya</p><p style="text-align: left"><span style="font-family: Arial, sans-serif">A luta contra as queimadas no Brasil, em especial em áreas como o Parque Estadual do Jaraguá e terras indígenas, revela a invisibilização e a precariedade do trabalho dos brigadistas voluntários. Enquanto os números de incêndios batem recordes históricos, pessoas como Lucas Tumporuvichá e Sonia Ara Mirim protegem o meio ambiente e o patrimônio cultural do Brasil. A história da Brigada Indígena no Jaraguá é um exemplo emblemático dessa situação, onde a dedicação e o conhecimento tradicional se chocam com a falta de estrutura e valorização.</span></p><p style="text-align: center"><span style="font-family: Arial, sans-serif"><strong>“O problema é que o direito ele não serve da mesma forma para todo mundo. Não tem como discutir… A questão não é a gente conquistar mais direitos. a gente sempre tem que lutar para que o nosso direito conquistado seja colocado em prática” disse Thiago Djekupe, ativista e líder guarani</strong></span></p><img style="max-width: 500px; height: auto;" src="https://storage.googleapis.com/portal-sini.firebasestorage.app/images/1745525242325_Sem TÃ­tulo-1.jpg"><p style="text-align: left"></p><p style="text-align: left"></p><p style="text-align: left"><em>Texto Supervisionado por Vaniele Barreiros da Silva</em></p><p style="text-align: left"><br></p><p style="text-align: left"><br></p><p style="text-align: left"></p><p style="text-align: left"></p><p style="text-align: left"></p><p style="text-align: left"><br></p><p style="text-align: left"></p><p style="text-align: left"></p><p style="text-align: left"><br></p>
  `
};

const mockRelatedArticles = [
  {
    id: 2,
    title: 'Princípios do Design Responsivo',
    summary: 'Conheça os fundamentos do design que se adapta a qualquer tela',
    category: 'Design',
    date: '2023-04-20'
  },
  {
    id: 3,
    title: 'CSS Grid vs Flexbox',
    summary: 'Quando usar cada uma dessas poderosas técnicas de layout',
    category: 'Desenvolvimento',
    date: '2023-03-15'
  },
  {
    id: 4,
    title: 'Otimização para Dispositivos Móveis',
    summary: 'Técnicas para melhorar performance em smartphones',
    category: 'Performance',
    date: '2023-02-10'
  }
];

// Componentes estilizados (copiados da sua implementação com ajustes)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-top: 3.5rem;
  gap: 1rem;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @media (min-width: 769px) {
    flex-direction: row;
    align-items: flex-start;
    margin-top: 5rem;
    padding: 2rem;
  }
`;

const ArticleWrapper = styled.div`
  width: 100%;
  order: 1;

  @media (min-width: 769px) {
    flex: 3;
    order: initial;
    margin-right: -1rem;
  }
`;

const SidebarWrapper = styled.div`
  width: 100%;
  order: 2;

  @media (min-width: 769px) {
    flex: 1;
    order: initial;
    margin-left: -1rem;
  }
`;

const ArticleContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (min-width: 769px) {
    padding: 1.5rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: fadeIn 0.3s forwards;
  
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

const ModalImage = styled.img`
  max-width: 95%;
  max-height: 95vh;
  border-radius: 8px;
  cursor: zoom-out;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transform: scale(0.95);
  transition: transform 0.3s ease;
  animation: zoomIn 0.3s forwards;
  
  @keyframes zoomIn {
    to { transform: scale(1); }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.5rem 0;

  &:hover {
    background: #F8F8FF;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
  }
`;

const TitleContainer = styled.div`
  text-align: left;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  h1 {
    font-size: 1.75rem;
    margin-bottom: 0.25rem;
    line-height: 1.3;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 400;
    color: #555;
    line-height: 1.4;
  }

  p {
    font-size: 0.9rem;
    color: #777;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    
    h1 {
      font-size: 1.5rem;
    }
    
    h2 {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    
    h1 {
      font-size: 1.3rem;
    }
    
    h2 {
      font-size: 1rem;
    }
    
    p {
      font-size: 0.85rem;
    }
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 1rem;
  z-index: 100;
`;

const Footer = styled.footer`
  background: #f8f9fa;
  padding: 1.5rem;
  text-align: center;
  margin-top: auto;
`;

const SideBar = ({ articles }) => (
  <div style={{
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  }}>
    <h3>Artigos Relacionados</h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {articles.map(article => (
        <li key={article.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>{article.title}</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{article.summary}</p>
          <small style={{ color: '#999' }}>{article.date}</small>
        </li>
      ))}
    </ul>
  </div>
);

// Componente principal
const ArticlePageMock = () => {
  const [expandedImage, setExpandedImage] = useState(null);
  const articleContentRef = useRef(null);

  // Simula o efeito de clique nas imagens
  const handleImageClick = (e) => {
    if (e.target.tagName === 'IMG') {
      setExpandedImage(e.target.src);
    }
  };

  const handleShare = () => {
    alert('Funcionalidade de compartilhamento ativada!\nURL: ' + window.location.href);
  };

  return (
    <Container>
      <Header>
        <h1 style={{ margin: 0 }}>Logo do Site</h1>
      </Header>
      
      <MainContent>
        <ArticleWrapper>
          <ArticleContainer>
            <TitleContainer>
              <h1>{mockArticle.title}</h1>
              <h2>{mockArticle.summary}</h2>
              <p>
                <i>
                  {mockArticle.author} - {new Date(mockArticle.date).toLocaleDateString('pt-BR')} | 
                </i>
              </p>
            </TitleContainer>

            <ShareButton onClick={handleShare}>
              <Share2 size={18} /> Compartilhar
            </ShareButton>

            <div 
              className="article-content" 
              ref={articleContentRef}
              onClick={handleImageClick}
              dangerouslySetInnerHTML={{ __html: mockArticle.content }} 
              style={{
                width: '100%',
                lineHeight: '1.6',
                fontFamily: 'Arial, sans-serif',
                color: '#333'
              }}
            />
            
            {expandedImage && (
              <ModalOverlay onClick={() => setExpandedImage(null)}>
                <ModalImage 
                  src={expandedImage} 
                  alt="Imagem expandida" 
                  onClick={(e) => e.stopPropagation()} 
                />
                <CloseButton onClick={() => setExpandedImage(null)}>×</CloseButton>
              </ModalOverlay>
            )}
          </ArticleContainer>
        </ArticleWrapper>

        <SidebarWrapper>
          <SideBar articles={mockRelatedArticles} />
        </SidebarWrapper>
      </MainContent>
      
      <Footer>
        <p>© 2023 Meu Site - Todos os direitos reservados</p>
      </Footer>
    </Container>
  );
};

export default ArticlePageMock;