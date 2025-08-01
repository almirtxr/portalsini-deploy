// NewsletterSignup.jsx
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: 'Inter', sans-serif;
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #444;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 12px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1.5px solid #c78a47;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  background: #faf9fa;

  &:focus {
    border-color: #c78a47;
    box-shadow: 0 0 0 2px #ffe4ea;
    background: #fff;
  }

  &::placeholder {
    color: #000000;
    font-style: italic;
  }
`;

const Button = styled.button`
  background: #E07B00;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(199, 138, 71, 0.3);
  transition: background 0.2s, transform 0.1s;

  &:hover,
  &:focus {
    background: #b77b3f;
    transform: translateY(-2px) scale(1.03);
  }
`;

const SuccessMsg = styled.p`
  color: #000000;
  font-weight: bold;
  margin-top: 16px;
  font-size: 1.1rem;
  text-align: center;
`;

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://portalsini-backend-deploy.fly.dev/api/subscribe/subscribe",
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) setSubmitted(true);
  };

  return (
    <Wrapper>
      {submitted ? (
        <SuccessMsg>Inscrição concluída! 🎉</SuccessMsg>
      ) : (
        <>
          <Heading>📬 Fique por dentro! Assine a newsletter do Portal Sîni</Heading>
          <Description>Inscreva-se na nossa newsletter para atualizações exclusivas do Portal Sîni.</Description>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Inscrever-se</Button>
          </Form>
        </>
      )}
    </Wrapper>
  );
}
