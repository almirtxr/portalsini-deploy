// NewsletterSignup.jsx
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin-top: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1.5px solid #c78a47;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  background: #faf9fa;

  &:focus {
    border: 1.5px solid #c78a47;
    box-shadow: 0 0 0 2px #ffe4ea;
    background: #fff;
  }

  &::placeholder {
    color: #000000;
    font-style: italic;
  }
`;

const Button = styled.button`
  background: #c78a47;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(187, 24, 50, 0.08);
  transition: background 0.2s, transform 0.1s;

  &:hover,
  &:focus {
    background: #c78a47
    transform: translateY(-2px) scale(1.03);
  }
`;

const SuccessMsg = styled.p`
  color: #000000;
  font-weight: bold;
  margin-top: 12px;
  font-size: 1.1rem;
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

  return submitted ? (
    <SuccessMsg>Inscrição concluída!</SuccessMsg>
  ) : (
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
  );
}
// This component allows users to subscribe to a newsletter by entering their email.