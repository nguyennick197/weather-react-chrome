import { P } from "../atoms/Text";
import styled from "@emotion/styled";
import { Spacer } from "../atoms/Spacer";
import { Container } from "../atoms/Container";

const WeatherContainer = styled.div`
  justify-content: center;
  background-image: linear-gradient(to bottom right, #0084c8, #9370db);
  border-radius: 12px;
  padding: 12px;
  width: 240px;
`;

interface WeatherData {
  name: string;
  temp: number;
  group: string;
  feels_like?: number;
  humidity?: number;
  temp_max: number;
  temp_min: number;
  description?: string;
}

export function WeatherCard({
  name,
  temp,
  group,
  temp_max,
  temp_min,
}: WeatherData) {
  return (
    <WeatherContainer>
      <P size={24}> {name} </P>
      <Spacer size={4} />
      <P size={48}> {Math.round(temp)}&deg; </P>
      <Spacer />
      <P size={20}> {group} </P>
      <Spacer size={4} />
      <Container row justifyContent="center" width="100%">
        <P size={20}> H:{Math.round(temp_max)}&deg; </P>
        <Spacer size={12} />
        <P size={20}> L:{Math.round(temp_min)}&deg; </P>
      </Container>
    </WeatherContainer>
  );
}
