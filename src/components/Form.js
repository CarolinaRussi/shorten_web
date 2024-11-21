import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  background-color: #fff;
  padding: 15px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
    box-sizing: border-box;
`;

const Label = styled.label``;

const Button = styled.button`
    width: 100%;
    max-width: 150px;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: darkslategrey;
    color: white;
    height: 42px;
    box-sizing: border-box;
`;

const ShortenedUrl = styled.p`
    width: max-content;
    margin-top: 20px;
    justify-content: center;
    color: teal;
    font-weight: bold;
`;

const ErrorMessage = styled.p`
    width: max-content;
    margin-top: 20px;
    justify-content: center;
    color: Crimson;
    font-weight: bold;
`;

const Form = () => {
    const [longUrl, setLongUrl] = useState(""); 
    const [shortUrl, setShortUrl] = useState(""); 
    const [error, setError] = useState("");

    const isValidUrl = (url) => {
        const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
        return regex.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 

        if (!isValidUrl(longUrl)) {
            setError("Por favor, insira uma URL válida.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8800/", { long_url: longUrl }); //Aqui o axios conversa com meu back
            const generatedCode = response.data.code; // E aqui eu pego o codigo que o backend gerou
            setShortUrl(`http://localhost:3000/${generatedCode}`); // Aqui eu construo a url encurtada
        } catch (error) {
            console.error("Erro ao encurtar a URL:", error);
            setError("Ocorreu um erro ao processar sua solicitação.");
        }
    };
    return (
        <>
        <FormContainer onSubmit={handleSubmit}>
            <InputArea>
            <Input
                name="long_url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)} 
                placeholder="www.shortenurl.com.br"
            />
            </InputArea>
            <Button type="submit">SHORTEN!</Button>
        </FormContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>} {}
        {shortUrl && (
            <ShortenedUrl>
            Sua URL encurtada: <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: "LightSeaGreen" }}>{shortUrl}</a>
            </ShortenedUrl>
        )}
        </>
    );
};

export default Form;