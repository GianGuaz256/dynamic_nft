import dynamic from 'next/dynamic';
const Layout = dynamic(import('../components/layout'));
import { Theme, ThemeProvider } from 'theme-ui';
import { StickyProvider } from '../contexts/app/app.provider';
import theme from '../theme/index';
import { Box, Container } from 'theme-ui';
import MintingForm from '../components/MintingForm';


const BuyToken = () => {

    return (
        <ThemeProvider theme={theme as Theme}>
            <StickyProvider>
                <Layout logged={true}>
                    <Container>
                        <div className="w-full min-h-screen mt-32">
                            <h1 className="text-4xl font-bold">Buy NFTs</h1>
                            <MintingForm />
                        </div>
                    </Container>
                </Layout>
            </StickyProvider>
        </ThemeProvider>
    )
}

export default BuyToken;
  