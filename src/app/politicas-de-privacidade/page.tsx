import React from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-slate-900">Política de Privacidade da Yevent</h1>
                    <Link href="/contato">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6">
                            Anuncie aqui seu espaço
                        </Button>
                    </Link>
                </div>

                <div className="prose prose-slate max-w-none text-gray-600 space-y-8">
                    <p className="lead">
                        Bem-vindo à Yevent, inscrita no CNPJ 08.062.803/0001-95, com sede no Recife – Rua Manuel de Brito, 311 – Pina – Recife-PE. Nosso compromisso é com a integridade e a segurança dos dados pessoais dos nossos usuários e clientes. Esta Política de Privacidade aplica-se a todas as interações digitais realizadas em nosso site yevent.com.br, serviços associados, aplicativos móveis e outras plataformas digitais sob nosso controle.
                    </p>
                    <p>
                        Ao acessar e utilizar nossas plataformas, você reconhece e concorda com as práticas descritas nesta política. Nós tratamos a proteção de seus dados pessoais com a máxima seriedade e nos comprometemos a processá-los de forma responsável, transparente e segura.
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Definições</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>"Dados Pessoais"</strong> são informações que identificam ou podem identificar uma pessoa natural.</li>
                            <li><strong>"Dados Pessoais Sensíveis"</strong> são informações que revelam características pessoais íntimas, como origem racial, convicções religiosas, opiniões políticas, dados genéticos ou biométricos.</li>
                            <li><strong>"Tratamento de Dados Pessoais"</strong> abrange qualquer operação com Dados Pessoais, como coleta, registro, armazenamento, uso, compartilhamento ou destruição.</li>
                            <li><strong>"Leis de Proteção de Dados"</strong> são todas as leis que regulamentam o Tratamento de Dados Pessoais, incluindo a LGPD (Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/18).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Dados Coletados e Motivos da Coleta</h2>
                        <p className="mb-4">Nós coletamos e processamos os seguintes tipos de dados pessoais:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Informações Fornecidas por Você:</strong> Isso inclui, mas não se limita a, nome, sobrenome, endereço de e-mail, endereço físico, informações de pagamento e quaisquer outras informações que você optar por fornecer ao criar uma conta, fazer uma compra ou interagir com nossos serviços de atendimento ao cliente.</li>
                            <li><strong>Informações Coletadas Automaticamente:</strong> Quando você visita nosso site, coletamos automaticamente informações sobre seu dispositivo e sua interação com nosso site. Isso pode incluir dados como seu endereço IP, tipo de navegador, detalhes do dispositivo, fuso horário, páginas visitadas, produtos visualizados, sites ou termos de busca que o direcionaram ao nosso site, e informações sobre como você interage com nosso site.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Uso de Cookies e Tecnologias de Rastreamento</h2>
                        <p className="mb-4">A Yevent utiliza cookies, que são pequenos arquivos de texto armazenados no seu dispositivo, e outras tecnologias de rastreamento para melhorar a experiência do usuário em nosso site yevent.com.br, entender como nossos serviços são utilizados e otimizar nossas estratégias de marketing.</p>

                        <h3 className="text-xl font-medium text-slate-800 mb-3">Tipos de Cookies Utilizados:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Cookies Essenciais:</strong> Essenciais para o funcionamento do site, permitindo que você navegue e use suas funcionalidades. Sem esses cookies, serviços como carrinho de compras e processamento de pagamento não podem ser fornecidos.</li>
                            <li><strong>Cookies de Desempenho e Analíticos:</strong> Coletam informações sobre como os visitantes usam o nosso site, quais páginas são visitadas com mais frequência e se eles recebem mensagens de erro. Esses cookies são usados apenas para melhorar o desempenho e a experiência do usuário no site.</li>
                            <li><strong>Cookies de Funcionalidade:</strong> Permitem que o site lembre de escolhas que você faz (como seu nome de usuário, idioma ou a região em que você está) e forneça recursos aprimorados e mais pessoais.</li>
                            <li><strong>Cookies de Publicidade e Redes Sociais:</strong> Usados para oferecer anúncios mais relevantes para você e seus interesses. Eles também são usados para limitar o número de vezes que você vê um anúncio, bem como ajudar a medir a eficácia das campanhas publicitárias.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Finalidades do Processamento de Dados</h2>
                        <p className="mb-4">Os dados coletados são utilizados para:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Proporcionar, operar e melhorar nossos serviços e ofertas;</li>
                            <li>Processar suas transações e enviar notificações relacionadas a suas compras;</li>
                            <li>Personalizar sua experiência do usuário e recomendar conteúdo ou produtos que possam ser do seu interesse;</li>
                            <li>Comunicar informações importantes, ofertas e promoções, conforme sua preferência de comunicação;</li>
                            <li>Realizar análises internas para desenvolver e aprimorar nossos serviços;</li>
                            <li>Cumprir obrigações legais e regulatórias aplicáveis.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Compartilhamento e Transferência de Dados Pessoais</h2>
                        <p className="mb-4">Nós podemos compartilhar seus dados pessoais com terceiros nas seguintes circunstâncias:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Com fornecedores de serviços e parceiros que nos auxiliam nas operações de negócio, desde que estes atuem em conformidade com nossas diretrizes de proteção de dados e com a legislação aplicável;</li>
                            <li>Para cumprir com obrigações legais, responder a processos judiciais, ou proteger nossos direitos e propriedades, bem como a segurança de nossos clientes e do público;</li>
                            <li>Em caso de reestruturação corporativa, venda, fusão ou outra transferência de ativos, garantindo que a entidade receptora concorde em respeitar a privacidade de seus dados de acordo com uma política equivalente à nossa.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Links para outros sites e redes sociais</h2>
                        <p className="mb-4">Nossa plataforma pode incluir links para sites externos de parceiros, anunciantes e fornecedores. Clicar nesses links implica que você será direcionado para fora do nosso site, entrando em domínios que seguem suas próprias políticas de privacidade, pelas quais não somos responsáveis.</p>
                        <p>Recomendamos a leitura atenta dessas políticas antes de fornecer qualquer dado pessoal. Da mesma forma, não assumimos responsabilidade pelas práticas de privacidade de terceiros como Facebook, Apple, Google e Microsoft. Aconselhamos você a se informar sobre as políticas de privacidade dessas entidades ao utilizar seus serviços ou aplicativos.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Direitos dos Titulares dos Dados</h2>
                        <p className="mb-4">Você possui diversos direitos em relação aos seus dados pessoais, incluindo:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>O direito de acesso, retificação ou exclusão de seus dados pessoais sob nosso posse;</li>
                            <li>O direito de limitar ou se opor ao nosso processamento de seus dados;</li>
                            <li>O direito à portabilidade de dados;</li>
                            <li>O direito de retirar seu consentimento a qualquer momento, quando o processamento for baseado em consentimento.</li>
                        </ul>
                        <p>Para exercer esses direitos, entre em contato conosco através de suporte@yevent.com.br.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Segurança dos Dados</h2>
                        <p>Implementamos medidas de segurança técnica e organizacional para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, é importante notar que nenhum sistema é completamente seguro. Nos comprometemos a notificar você e qualquer autoridade aplicável de quaisquer brechas de segurança de acordo com a legislação vigente.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Alterações na Política de Privacidade</h2>
                        <p>Nossa Política de Privacidade pode ser atualizada periodicamente. A versão mais atual será sempre publicada em nosso site, indicando a data da última revisão. Encorajamos você a revisar regularmente nossa política para estar sempre informado sobre como estamos protegendo seus dados.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Contato</h2>
                        <p>Se tiver dúvidas ou preocupações sobre nossa Política de Privacidade ou práticas de dados, por favor, não hesite em nos contatar em suporte@yevent.com.br. Estamos comprometidos em resolver quaisquer questões relacionadas à privacidade de nossos usuários e clientes.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
