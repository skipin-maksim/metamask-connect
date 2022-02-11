import styled from "styled-components";
import MainContent from "../MainContent/MainContent";
import Header from "../Header/Header";

function App() {
  return (
    <StyledApp>
      <Header />
      <MainContent />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
`;
