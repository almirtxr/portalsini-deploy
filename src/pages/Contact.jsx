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
`;

const Contact = () => {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <p>
            Queremos ouvir você! Se tem dúvidas, sugestões ou deseja colaborar com o nosso portal, entre em contato conosco.
        </p>
        <p>
            Envie um e-mail para:
            <a href="mailto:contato@portalsini.com.br"> contato@portalsini.com.br</a>
        </p>
        <p>
            Nossa equipe retornará o mais breve possível. Juntos, fortalecemos a voz dos povos indígenas e afro-brasileiros, promovendo a diversidade, a memória e a luta por direitos.
        </p>
        <p>
            O Portal Sîni acredita que cada história contada ajuda a construir um amanhã mais justo e representativo.
        </p>
        </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default Contact;