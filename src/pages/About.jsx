import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="relative mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6">
        <img
          src="/manchas-corner.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-24 w-32 opacity-[0.08] sm:w-44"
        />

        <p className="cat-label">Sobre</p>
        <h1 className="headline mt-3 text-4xl sm:text-5xl">
          <span className="mark-yellow">
            <span className="mark-bar" aria-hidden="true" />
            <span className="mark-text">O Portal Sîni</span>
          </span>
        </h1>

        <div className="article-content mt-8">
          <p>
            <strong>Sîni</strong> — onça, na língua terena — inspira o nome deste projeto.
          </p>
          <p>
            Na natureza, é possível encontrar as mais simples e completas lições, e este
            animal — o maior felino das Américas — pode agregar valores no exercício do
            jornalismo.
          </p>
          <p>
            Uma onça nunca age sem saber exatamente o momento certo. Nas águas, ela nada com
            leveza, e na mata dá passos cautelosos com um olhar muito apurado avistando sua
            presa. Por fim, finaliza com um ataque ágil, cumprindo seu objetivo.
          </p>
          <p>
            No campo do jornalismo, fatos bem apurados e checados fazem parte da rotina. A
            agilidade proporciona um serviço completo para os interessados.
          </p>
          <p>
            <strong>Seja bem-vindo ao Portal Sîni. Você é o nosso público-alvo!</strong>
          </p>

          <h2>Sobre o que falamos</h2>
          <p>
            A educação será o tema principal por aqui. Mas surgirão também demais assuntos que
            envolvam o viver de povos minorizados.
          </p>
          <p>
            Este projeto tem a finalidade de ser um portfólio acadêmico e, quem sabe, o início
            de um caminho profissional.
          </p>

          <h2>Sobre mim</h2>
          <p>
            Sou Brenda Teixeira, indígena Terena em contexto urbano, 29 anos, e curso o terceiro
            semestre de Jornalismo na Fapcom (Faculdade Paulus de Comunicação e Tecnologia).
          </p>
          <p>
            Sou natural de Aquidauana — cidade localizada no sul do Pantanal e no oeste do estado
            do Mato Grosso do Sul (MS). Moro em São Paulo, capital, desde o ano de 2017.
          </p>
          <p>
            Escolhi o jornalismo pelo seu valor histórico e herança familiar, e em 2024 fui
            contemplada com uma bolsa de 50% do ProUni (Programa Universidade para Todos) para a
            graduação.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
