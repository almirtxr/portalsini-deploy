import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";

const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 50px; /* Ajusta o conteúdo para não ficar sob o header fixo */
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 90%;
  margin: 100px auto; /* Ajusta a margem superior para evitar sobreposição com o header fixo */
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  color: #333;
  text-align: justify;
`;

const About = () => {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <h2>O Portal Sîni</h2>
        <p><strong>Sîni</strong> - onça, na língua terena, inspira o nome deste projeto.</p>
        <p>Na natureza, é possível encontrar as mais simples e completas lições, e este animal - o maior felino das américas - pode agregar valores no exercício do jornalismo.</p>
        <p>Uma onça nunca age sem saber exatamente o momento certo. Nas águas, ela nada com leveza, e na mata ela dá passos cautelosos com um olhar muito apurado avistando sua presa. Por fim, finaliza com um ataque ágil, cumprindo seu objetivo.</p>
        <p>No campo do Jornalismo, fatos bem apurados e checados fazem parte da rotina. A agilidade proporciona um serviço completo para os interessados.</p>
        <h3>Seja bem-vindo ao Portal Sîni. Você é o nosso público-alvo!</h3>
        <h2>Sobre o que falamos</h2>
        <p>A educação será o tema principal por aqui. Mas surgirão também demais assuntos que envolvam o viver de povos minorizados.</p>
        <p>Este tem a finalidade de ser um portfólio acadêmico e, quem sabe, o início de um caminho profissional.</p>
        <h2>Sobre mim</h2>
        <p>Sou Brenda Teixeira, indígena Terena em contexto urbano, 29 anos e curso o terceiro semestre de Jornalismo na Fapcom (Faculdade Paulus de Comunicação e Tecnologia).</p>
        <p>Sou natural de Aquidauana - cidade localizada no sul do Pantanal e no oeste do estado do Mato Grosso do Sul (MS). Moro em São Paulo, capital, desde o ano de 2017.</p>
        <p>Escolhi o Jornalismo pelo seu valor histórico e herança familiar, e em 2024, fui contemplada com uma bolsa de 50% do ProUni (Programa Universidade para Todos) para a graduação.</p>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default About;