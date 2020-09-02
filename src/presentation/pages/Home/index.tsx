import React, { useState } from "react";
import { BasicCountry } from "@/domain/models";

import { Container } from "./styles";
import { CountryCard } from "./components";

const Home: React.FC = () => {
  const [countries] = useState<BasicCountry[]>([]);

  return (
    <div style={{ position: "relative" }}>
      <Container>
        {countries &&
          countries.map((country) => (
            <CountryCard key={country.id} {...country} />
          ))}
      </Container>
    </div>
  );
};

export default Home;
