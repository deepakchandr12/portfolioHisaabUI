import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Card = styled.div`
  background: white;
  padding: 40px 60px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Heading = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: #666;
  font-size: 18px;
  margin-bottom: 30px;
`;

const Countdown = styled.p`
  color: #999;
  font-size: 14px;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ab8;
  }
`;

const Logout = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(50);

  const handleGoHome = () => {
    navigate("/");
  };
  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    const timer = setTimeout(() => {
      navigate("/");
    }, 50000);

    return () => {
      clearInterval(countdown);
      clearTimeout(timer);
    }; //cleanup on unmount
  }, [navigate]);

  return (
    <Container>
      <Card>
        <Heading>Thank You!</Heading>
        <Message>
          You have been successfully logged out. We hope to see you again soon!
        </Message>
        <Button onClick={handleGoHome}>Go to Home</Button>
        <Countdown>
          You will be redirected in {secondsLeft} second
          {secondsLeft !== 1 ? "s" : ""}...
        </Countdown>
      </Card>
    </Container>
  );
};

export default Logout;
