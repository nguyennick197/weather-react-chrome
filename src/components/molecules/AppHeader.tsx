import { Container } from "../atoms/Container";
import { Spacer } from "../atoms/Spacer";
import { P } from "../atoms/Text";
import { HR } from "../atoms/HR";
import Logo from "../../icons/logo.png";

export function AppHeader() {
  return (
    <Container width="100%">
      <Container row alignItems="center" padding={8}>
        <img src={Logo} height={30} width={30} alt="Logo" />
        <Spacer />
        <P size={20}> Luna Weather </P>
      </Container>
      <HR />
    </Container>
  );
}
