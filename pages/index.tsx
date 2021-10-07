import dynamic from 'next/dynamic';
const Seo = dynamic(import('../components/seo'));
const Layout = dynamic(import('../components/layout'));
const Banner = dynamic(import('../sections/banner'));
const WhyChoose = dynamic(import('../sections/why-choose'));
const RoadMap = dynamic(import('../sections/roadmap'));
const CountDownBlock = dynamic(import('../sections/countdown'));
const CallToAction = dynamic(import('../sections/call-to-action'));
import { Theme, ThemeProvider } from 'theme-ui';
import { StickyProvider } from '../contexts/app/app.provider';
import theme from '../theme/index';

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme  as Theme}>
      <StickyProvider>
        <Layout logged={false}>
          <Seo
            meta=""
            title="Dynamic NFT Marketplace"
            description="The first dynamic NFT marketplace where you can create the story of your digital assets!"
          />
          <Banner />
          <WhyChoose />
          <CountDownBlock />
          <RoadMap />
          <CallToAction />
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
}
