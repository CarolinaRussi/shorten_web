import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items:center;
  gap: 10px;

`;

const Title = styled.h2`
  margin-top: 30%;
  align-self: flex-start;
  color: darkslategrey;
  width: 100%;
  display: flex;
  justify-content: center;
  
`;

const Subtitle = styled.p`
  align-self: flex-start;
  font-size: 16px;
  color: teal;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const P = styled.p`
  align-self: flex-start;
  font-size: 16px;
  color: teal;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Redirect = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/${shortCode}`);
        if (response.status === 200) {
          const { long_url } = response.data;
          if (long_url) {
            window.location.href = long_url;
          } else {
            console.error("A URL longa não está disponível.");
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar a URL longa:", error);
        navigate("/");
      }
    };

    fetchLongUrl();
  }, [shortCode, navigate]);

  return <P>Redirecionando...</P>;
};

function App() {
  return (
    <>
    <Routes>
        <Route
          path="/"
          element={
            <Container>
              <Title>Shorten Urls</Title>
              <Subtitle>Diminua suas urls de forma rápida e fácil</Subtitle>
              <Form />
            </Container>
          }
        />
      <Route path="/:shortCode" element={<Redirect />} />
      </Routes>
      <GlobalStyle />
    </>
  );
}

export default App;
