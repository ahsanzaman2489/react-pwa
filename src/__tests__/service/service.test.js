import newsService from '../../service';

jest.mock('../../service/', () => {
    return class newsService {
        fetchList = () => {
            return new Promise(resolve => {
                resolve({
                    "status": "ok",
                    "sources": [{
                        "id": "argaam",
                        "name": "Argaam",
                        "description": "ارقام موقع متخصص في متابعة سوق الأسهم السعودي تداول - تاسي - مع تغطيه معمقة لشركات واسعار ومنتجات البتروكيماويات , تقارير مالية الاكتتابات الجديده ",
                        "url": "http://www.argaam.com",
                        "category": "business",
                        "language": "ar",
                        "country": "sa"
                    }, {
                        "id": "australian-financial-review",
                        "name": "Australian Financial Review",
                        "description": "The Australian Financial Review reports the latest news from business, finance, investment and politics, updated in real time. It has a reputation for independent, award-winning journalism and is essential reading for the business and investor community.",
                        "url": "http://www.afr.com",
                        "category": "business",
                        "language": "en",
                        "country": "au"
                    }, {
                        "id": "bloomberg",
                        "name": "Bloomberg",
                        "description": "Bloomberg delivers business and markets news, data, analysis, and video to the world, featuring stories from Businessweek and Bloomberg News.",
                        "url": "http://www.bloomberg.com",
                        "category": "business",
                        "language": "en",
                        "country": "us"
                    }, {
                        "id": "business-insider",
                        "name": "Business Insider",
                        "description": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
                        "url": "http://www.businessinsider.com",
                        "category": "business",
                        "language": "en",
                        "country": "us"
                    }, {
                        "id": "business-insider-uk",
                        "name": "Business Insider (UK)",
                        "description": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
                        "url": "http://uk.businessinsider.com",
                        "category": "business",
                        "language": "en",
                        "country": "gb"
                    }, {
                        "id": "cnbc",
                        "name": "CNBC",
                        "description": "Get latest business news on stock markets, financial & earnings on CNBC. View world markets streaming charts & video; check stock tickers and quotes.",
                        "url": "http://www.cnbc.com",
                        "category": "business",
                        "language": "en",
                        "country": "us"
                    }, {
                        "id": "die-zeit",
                        "name": "Die Zeit",
                        "description": "Aktuelle Nachrichten, Kommentare, Analysen und Hintergrundberichte aus Politik, Wirtschaft, Gesellschaft, Wissen, Kultur und Sport lesen Sie auf ZEIT ONLINE.",
                        "url": "http://www.zeit.de/index",
                        "category": "business",
                        "language": "de",
                        "country": "de"
                    }, {
                        "id": "financial-post",
                        "name": "Financial Post",
                        "description": "Find the latest happenings in the Canadian Financial Sector and stay up to date with changing trends in Business Markets. Read trading and investing advice from professionals.",
                        "url": "http://business.financialpost.com",
                        "category": "business",
                        "language": "en",
                        "country": "ca"
                    }, {
                        "id": "fortune",
                        "name": "Fortune",
                        "description": "Fortune 500 Daily and Breaking Business News",
                        "url": "http://fortune.com",
                        "category": "business",
                        "language": "en",
                        "country": "us"
                    }, {
                        "id": "handelsblatt",
                        "name": "Handelsblatt",
                        "description": "Auf Handelsblatt lesen sie Nachrichten über Unternehmen, Finanzen, Politik und Technik. Verwalten Sie Ihre Finanzanlagen mit Hilfe unserer Börsenkurse.",
                        "url": "http://www.handelsblatt.com",
                        "category": "business",
                        "language": "de",
                        "country": "de"
                    }, {
                        "id": "il-sole-24-ore",
                        "name": "Il Sole 24 Ore",
                        "description": "Notizie di economia, cronaca italiana ed estera, quotazioni borsa in tempo reale e di finanza, norme e tributi, fondi e obbligazioni, mutui, prestiti e lavoro a cura de Il Sole 24 Ore.",
                        "url": "http://www.ilsole24ore.com",
                        "category": "business",
                        "language": "it",
                        "country": "it"
                    }, {
                        "id": "info-money",
                        "name": "InfoMoney",
                        "description": "No InfoMoney você encontra tudo o que precisa sobre dinheiro. Ações, investimentos, bolsas de valores e muito mais. Aqui você encontra informação que vale dinheiro!",
                        "url": "http://www.infomoney.com.br",
                        "category": "business",
                        "language": "pt",
                        "country": "br"
                    }, {
                        "id": "les-echos",
                        "name": "Les Echos",
                        "description": "Toute l'actualité économique, financière et boursière française et internationale sur Les Echos.fr",
                        "url": "https://www.lesechos.fr",
                        "category": "business",
                        "language": "fr",
                        "country": "fr"
                    }, {
                        "id": "the-economist",
                        "name": "The Economist",
                        "description": "The Economist offers authoritative insight and opinion on international news, politics, business, finance, science, technology and the connections between them.",
                        "url": "http://www.economist.com",
                        "category": "business",
                        "language": "en",
                        "country": "gb"
                    }, {
                        "id": "the-wall-street-journal",
                        "name": "The Wall Street Journal",
                        "description": "WSJ online coverage of breaking news and current headlines from the US and around the world. Top stories, photos, videos, detailed analysis and in-depth reporting.",
                        "url": "http://www.wsj.com",
                        "category": "business",
                        "language": "en",
                        "country": "us"
                    }, {
                        "id": "wirtschafts-woche",
                        "name": "Wirtschafts Woche",
                        "description": "Das Online-Portal des führenden Wirtschaftsmagazins in Deutschland. Das Entscheidende zu Unternehmen, Finanzen, Erfolg und Technik.",
                        "url": "http://www.wiwo.de",
                        "category": "business",
                        "language": "de",
                        "country": "de"
                    }]
                });
            })
        };
    }
});

describe("Fetch results from mock api", () => {
    it('Should recieve sources data async', done => {
        const service = new newsService();

        const fetchMock = service.fetchList();
        fetchMock.then((response) => {
            expect(response.sources.length).toBe(16);
            done();
        });
    });
});



