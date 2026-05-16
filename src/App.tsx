import React, { useState, useMemo, useEffect } from 'react';
import { 
  Check, 
  X, 
  MessageCircle, 
  Mail, 
  Smartphone, 
  Clock, 
  Target, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  Plus,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { SocialProof } from './components/SocialProof';

// --- Components ---

const Button = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    className={`bg-brand-yellow hover:bg-yellow-400 text-black font-extrabold py-4 px-8 rounded-full transition-all transform hover:scale-105 active:scale-95 text-center shadow-lg uppercase tracking-tight ${className}`}
    {...props}
  >
    {children}
  </button>
);

const SectionTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`text-3xl md:text-5xl font-black uppercase text-center leading-tight ${className}`}>
    {children}
  </h2>
);

const Card = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${className}`} {...props}>
    {children}
  </div>
);

// --- Page Sections ---

export default function App() {
  const [offerTime, setOfferTime] = useState(900); // 15:00

  useEffect(() => {
    const timer = setInterval(() => {
      setOfferTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59 in seconds

  useEffect(() => {
    if (showUpsell && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showUpsell, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Meta Pixel Code
    const fbPixel = function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    };

    fbPixel(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    
    // Only init if not already initialized to avoid duplication
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('init', '1476955030061377');
      // Removed manual PageView here as it's often handled by UTMify or auto-events, 
      // preventing the duplication reported by the user.
    }
  }, []);

  const trackIC = () => {
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  };

  const trackPurchase = (value: number, name: string) => {
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'Purchase', {
        value: value,
        currency: 'BRL',
        content_name: name
      });
    }
  };

  const carouselImages = [
    "https://i.imgur.com/RDqdVCp.jpeg",
    "https://i.imgur.com/BhLv9rV.jpeg",
    "https://i.imgur.com/L1aIIjk.jpeg",
    "https://i.imgur.com/W6rLSIM.jpeg",
    "https://i.imgur.com/2Z8koKv.jpeg",
    "https://i.imgur.com/UYSBqsm.jpeg",
    "https://i.imgur.com/JjgQwlt.jpeg",
    "https://i.imgur.com/kH9MVn2.png",
    "https://i.imgur.com/UoOld6w.png",
    "https://i.imgur.com/X1GeHoD.jpeg"
  ];

  const bonuses = [
    { 
      id: 1, 
      label: "BÔNUS HOJE!", 
      title: "GUIA DE RAÇÃO CASEIRA", 
      desc: "Receitas simples para economizar na alimentação das galinhas e aumentar o lucro.",
      img: "https://i.imgur.com/TAWsUy3.jpeg"
    },
    { 
      id: 2, 
      label: "BÔNUS HOJE!", 
      title: "GUIA DE DOENÇAS", 
      desc: "Aprenda a evitar prejuízos e manter suas galinhas saudáveis.",
      img: "https://i.imgur.com/29lM7TV.jpeg"
    },
    { 
      id: 3, 
      label: "BÔNUS HOJE!", 
      title: "ESTRATÉGIA PARA VENDER OVOS", 
      desc: "Como conseguir clientes e vender ovos caipiras todos os dias.",
      img: "https://i.imgur.com/sH7OQzz.jpeg"
    },
    { 
      id: 4, 
      label: "BÔNUS HOJE!", 
      title: "MODELO DE GALINHEIRO", 
      desc: "Modelo simples e econômico para começar sua criação mesmo com pouco espaço.",
      img: "https://i.imgur.com/fbOxRXZ.jpeg"
    },
  ];

  const faqData = [
    { q: "O que vem incluso no pacote?", a: "Você recebe o Guia Completo de Criação Lucrativa de Galinha Caipira com todo o material prático para montar sua criação do zero. No Plano Completo você também leva os 4 bônus: Guia de Ração Caseira, Guia de Doenças, Estratégia para Vender Ovos e Modelo de Galinheiro." },
    { q: "Como vou ter acesso ao material?", a: "Assim que o pagamento é confirmado, o link de acesso chega direto no seu WhatsApp e no seu e-mail. É imediato, sem espera." },
    { q: "O material é digital ou físico?", a: "É 100% digital. Você acessa pelo celular, tablet ou computador, na hora que quiser e de onde estiver." },
    { q: "Para quem é indicado esse material?", a: "Para qualquer pessoa que tenha quintal, sítio, chácara ou terreno e queira começar a criar galinha caipira para produzir ovos e gerar renda. Não importa o tamanho do espaço nem se nunca criou antes." },
    { q: "Preciso de conhecimento prévio para usar?", a: "Não precisa de nada. O material foi feito para quem está começando do zero. É direto, simples e fácil de aplicar no mesmo dia." },
    { q: "Funciona para quem tem pouco espaço?", a: "Sim. O material foi pensado exatamente para quem tem pouco espaço. Você aprende como começar pequeno, gastar pouco e crescer aos poucos conforme sua criação evolui." },
    { q: "Qual a diferença entre o Plano Básico e o Completo?", a: "O Básico dá acesso ao guia principal de criação. O Completo inclui tudo isso mais os 4 bônus exclusivos que ensinam ração caseira, como evitar doenças, como vender ovos todo dia e o projeto do galinheiro. A maioria escolhe o Completo porque sai muito mais vantajoso por R$15." },
    { q: "Vou precisar investir muito dinheiro para aplicar?", a: "Não. O material ensina como começar com estrutura simples e barata. Um dos bônus mostra exatamente como fazer ração caseira para reduzir seus custos desde o primeiro dia." },
    { q: "E se eu não gostar do material?", a: "Você tem 7 dias de garantia total. Se por qualquer motivo não ficar satisfeito, é só pedir o reembolso e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia." }
  ];

  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('pt-BR');
  }, []);

  const getRedirectUrl = (baseUrl: string) => {
    const search = window.location.search;
    if (!search) return baseUrl;
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${search.substring(1)}`;
  };

  const scrollToOffer = () => {
    trackIC();
    const offerSection = document.getElementById('offer');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Header Banner */}
      <div className="bg-brand-red text-white py-2 text-center text-sm font-bold flex items-center justify-center gap-2">
        <Clock className="w-4 h-4" />
        OFERTA DISPONÍVEL APENAS HOJE, {currentDate}
      </div>

      {/* 2. Hero Section */}
      <section className="bg-gradient-hero pt-16 pb-12 md:pb-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <img 
              src="https://i.imgur.com/lcN01Ka.png" 
              alt="Criação Lucrativa" 
              className="w-full max-w-2xl mx-auto mb-10 drop-shadow-2xl" 
              referrerPolicy="no-referrer"
              fetchPriority="high"
              decoding="async"
            />
            <h1 className="text-3xl md:text-6xl font-black leading-[1.15] md:leading-[1.1] mb-8 uppercase tracking-tight md:tracking-tighter">
              Guia Completo Para Criar <br className="hidden md:block" />
              <span className="text-brand-yellow underline decoration-brand-yellow/30 underline-offset-4 md:underline-offset-[20px]">Galinha Caipira</span> no Quintal ou Sítio e Gerar <span className="underline decoration-green-600 underline-offset-4 md:underline-offset-[20px]">Renda Todo Mês</span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 font-medium mb-12 max-w-4xl mx-auto leading-tight md:leading-relaxed px-2">
              Aprenda a <span className="underline underline-offset-4">montar seu galinheiro</span>, <span className="underline underline-offset-4">produzir ovos todo dia</span> e <span className="underline underline-offset-4">vender direto</span> para clientes da sua região — mesmo <span className="underline underline-offset-4">começando do zero</span> e com pouco espaço.
            </p>
          </motion.div>


          
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="flex items-center gap-2 bg-white/5 py-2 px-4 rounded-full border border-white/10">
              <Smartphone className="w-5 h-5 text-green-400" />
              <span className="text-sm">Receba tudo na hora no seu WhatsApp e e-mail</span>
            </div>
            <div className="flex gap-6">
              <img src="https://centraldaeducacao.site/assets/icon-whatsapp-Cl5KKOau.avif" className="w-10 h-10 object-contain" alt="WhatsApp" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
              <img src="https://i.imgur.com/9SMb1ES.jpeg" className="w-10 h-10 object-contain" alt="E-mail" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Carousel Section */}
      <section className="bg-white text-black py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <SectionTitle className="text-black">📖 Veja como funciona o <span className="bg-brand-yellow px-2">material por dentro</span></SectionTitle>
            <p className="text-xl mt-4 text-center text-gray-600">Material completo e prático para começar sua criação de galinha caipira.</p>
          </div>
          
          <div className="relative overflow-hidden py-4">
            <motion.div 
              className="flex gap-6 w-max items-center"
              animate={{
                x: [0, -4240], // 10 images * (400px + 24px gap)
              }}
              transition={{
                duration: 35, // Adjusted for more images
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...carouselImages, ...carouselImages, ...carouselImages].map((img, i) => (
                <div key={i} className="shrink-0 w-[300px] md:w-[400px]">
                  <img 
                    src={img} 
                    alt={`Preview ${i}`}
                    className="w-full h-auto rounded-2xl shadow-xl border border-gray-100 hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Benefits Section */}
      <section className="bg-brand-blue py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle className="mb-4">O QUE VAI MUDAR <span className="border-b-4 border-brand-yellow">NO SEU QUINTAL OU SÍTIO</span></SectionTitle>
          <p className="text-center text-xl text-gray-400 mb-16 italic">Chega de improvisar — aqui você aprende do jeito simples.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="flex flex-col items-center text-center">
              <BookOpen className="w-10 h-10 text-brand-yellow mb-4" />
              <h3 className="font-bold text-xl mb-2">COMECE SUA CRIAÇÃO DO JEITO CERTO</h3>
              <p className="text-sm text-gray-400">Pare de tentar adivinhar como criar galinhas. Agora você segue um passo a passo simples e organizado.</p>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <Check className="w-10 h-10 text-brand-yellow mb-4" />
              <h3 className="font-bold text-xl mb-2">SAIBA COMO PRODUZIR MAIS OVOS</h3>
              <p className="text-sm text-gray-400">Aprenda como organizar sua criação para aumentar a produção e reduzir desperdícios.</p>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <Zap className="w-10 h-10 text-brand-yellow mb-4" />
              <h3 className="font-bold text-xl mb-2">PARE DE PERDER TEMPO E DINHEIRO</h3>
              <p className="text-sm text-gray-400">Sem erro, sem tentativa e erro, sem prejuízo. Um jeito simples de começar sua criação.</p>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <Clock className="w-10 h-10 text-brand-yellow mb-4" />
              <h3 className="font-bold text-xl mb-2">COMECE EM MINUTOS</h3>
              <p className="text-sm text-gray-400">Abra o material e aplique direto no seu quintal ou sítio. Receba tudo na hora no WhatsApp e e-mail.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Comparison Section */}
      <section className="bg-white text-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle className="text-black mb-12">Veja a diferença <span className="bg-brand-yellow px-2">sem o material</span> e <span className="bg-brand-yellow px-2">com o material</span></SectionTitle>
          
          <div className="flex justify-center mb-16">
            <img 
              src="https://i.imgur.com/9KXCkZF.jpeg" 
              alt="Comparação Material" 
              className="w-full max-w-4xl h-auto rounded-3xl"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-px bg-gray-200 rounded-3xl overflow-hidden shadow-xl mb-12">
            <div className="bg-gray-100 p-8 flex flex-col items-center text-center">
              <div className="bg-white px-6 py-2 rounded-lg shadow-sm mb-6 border border-red-100">
                <h3 className="text-xl font-black uppercase text-red-600 flex items-center gap-2">
                  <X className="w-6 h-6" /> SEM O MATERIAL
                </h3>
              </div>
              <ul className="space-y-4 text-left w-full">
                <li className="flex gap-2 text-sm font-medium text-gray-700">
                   <X className="w-5 h-5 text-red-500 shrink-0" />
                   <span>Quintal parado sem gerar renda</span>
                </li>
                <li className="flex gap-2 text-sm font-medium text-gray-700">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Não sabe por onde começar</span>
                </li>
                <li className="flex gap-2 text-sm font-medium text-gray-700">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Criação desorganizada</span>
                </li>
                <li className="flex gap-2 text-sm font-medium text-gray-700">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Depende de vídeos soltos da internet</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 flex flex-col items-center text-center relative border-l border-gray-200">
              <div className="bg-brand-yellow px-6 py-2 rounded-lg shadow-sm mb-6">
                <h3 className="text-xl font-black uppercase text-black flex items-center gap-2">
                  <Check className="w-6 h-6" /> COM O MATERIAL
                </h3>
              </div>
              <ul className="space-y-4 text-left w-full">
                <li className="flex gap-2 text-sm font-bold text-gray-900">
                  <Check className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Criação organizada</span>
                </li>
                <li className="flex gap-2 text-sm font-bold text-gray-900">
                  <Check className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Produção constante de ovos</span>
                </li>
                <li className="flex gap-2 text-sm font-bold text-gray-900">
                  <Check className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Mais lucro e menos desperdício</span>
                </li>
                <li className="flex gap-2 text-sm font-bold text-gray-900">
                  <Check className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Passo a passo simples na mão</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Results Blue Section */}
      <section className="bg-brand-blue py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-xs font-bold mb-6">
            <Target className="w-4 h-4 text-brand-yellow" /> RESULTADO NA HORA
          </div>
          <SectionTitle className="mb-6">VOCÊ VAI <span className="text-brand-yellow">VER RESULTADO NA HORA</span></SectionTitle>
          <p className="text-xl text-gray-300 mb-12">Imagine olhar seu quintal e <span className="text-white font-bold">saber exatamente como começar</span> sua criação.</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center text-left">
            <img src="https://i.imgur.com/NLCjef2.jpeg" className="rounded-2xl" alt="Conquista" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            <ul className="space-y-4">
              <li className="flex gap-3 items-center">
                <Check className="w-6 h-6 text-brand-yellow" />
                <span>Começa sua criação em poucos dias</span>
              </li>
              <li className="flex gap-3 items-center">
                <Check className="w-6 h-6 text-brand-yellow" />
                <span>Organiza seu quintal com clareza</span>
              </li>
              <li className="flex gap-3 items-center">
                <Check className="w-6 h-6 text-brand-yellow" />
                <span>Cria uma nova fonte de renda</span>
              </li>
              <li className="flex gap-3 items-center">
                <Check className="w-6 h-6 text-brand-yellow" />
                <span>Para de depender de tentativa e erro</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Pain Point Red Section */}
      <section className="bg-brand-red py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            VOCÊ TEM UM QUINTAL OU SÍTIO… MAS ELE NÃO TE DÁ <span className="bg-white text-brand-red px-2">RETORNO</span>?
          </h2>
          <p className="text-xl mb-12">Não é falta de vontade. É falta de um passo a passo simples. <span className="font-black">Esse material resolve isso.</span></p>
          
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex items-center gap-2"><X className="w-5 h-5" /> Espaço parado sem gerar nada</div>
            <div className="flex items-center gap-2"><X className="w-5 h-5" /> Dinheiro parado sem produtividade</div>
            <div className="flex items-center gap-2"><X className="w-5 h-5" /> Falta de organização e medo de começar errado</div>
          </div>
          
          <Button onClick={scrollToOffer} className="max-w-lg w-full flex items-center justify-center gap-2">
            QUERO TRANSFORMAR MEU QUINTAL <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* 8. Ideal For Section */}
      <section className="bg-white text-black py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <SectionTitle className="text-black mb-16">IDEAL PARA VOCÊ <br /> QUE:</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: "Tem quintal ou sítio e quer gerar renda", desc: "Você tem espaço, mas ele está parado ou subutilizado. Nosso material mostra como transformar isso em produção e lucro." },
              { icon: Clock, title: "Não sabe como começar sua criação", desc: "Dúvida sobre galinheiro, alimentação ou produção de ovos? O material resolve isso de forma simples." },
              { icon: Target, title: "Quer parar de perder dinheiro", desc: "Começar sem direção é prejuízo certo. Com o passo a passo correto, você evita erros e desperdícios." },
              { icon: MessageCircle, title: "Quer algo pronto e aplicável", desc: "Sem teorias complicadas. Você recebe o material e começa sua criação." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col items-start gap-4">
                <div className="bg-blue-600 text-white p-3 rounded-2xl">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-lg leading-tight uppercase">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Kit Content Breakdown (The big one in the middle) */}
      <section className="bg-brand-blue py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-brand-yellow text-black px-6 py-2 rounded-full inline-flex items-center gap-2 font-black text-sm mb-12 mx-auto">
            <Check className="w-4 h-4" /> TUDO ISSO ESTÁ INCLUSO NO SEU KIT
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 bg-white rounded-[3rem] p-8 md:p-16 text-black items-center">
            <div className="relative">
              <img src="https://i.imgur.com/lcN01Ka.png" className="w-full h-auto" alt="Kit Contents" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
              <div className="absolute -top-4 -left-4 bg-brand-red text-white py-2 px-6 rounded-xl font-bold transform -rotate-3">
                ACESSO IMEDIATO
              </div>
            </div>
            
            <div>
              <div className="bg-brand-yellow/10 text-yellow-600 px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                ITEM 01
              </div>
              <h3 className="text-4xl font-black mb-6 uppercase leading-tight">
                CRIAÇÃO LUCRATIVA <br /> DE GALINHA CAIPIRA
              </h3>
              <p className="font-bold mb-8 italic">O guia prático para transformar seu quintal ou sítio em uma fonte de renda.</p>
              
              <ul className="space-y-4">
                {[
                  "Passo a Passo Completo",
                  "Do zero até a venda dos ovos",
                  "Estrutura Econômica",
                  "Como montar um galinheiro simples e barato",
                  "Produção de Ovos",
                  "Como aumentar sua produtividade",
                  "Acesso Vitalício e Imediato",
                  "Compre uma vez e use para sempre",
                  "Atualizações Gratuitas",
                  "Sempre novos conteúdos inclusos"
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    {i % 2 === 0 ? <Check className="w-5 h-5 text-yellow-500 shrink-0" /> : <div className="w-5 h-5" />}
                    <span className={i % 2 !== 0 ? "text-gray-500 text-xs pl-5" : "font-bold"}>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 flex flex-col items-center gap-2">
                <p className="font-black text-brand-red">+ 4 BÔNUS EXCLUSIVOS ABAIXO 👇</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9.5 Bonus Section Section Title Refinement */}
      <section className="bg-brand-blue py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase">E NÃO PARA POR AÍ... <span className="text-brand-yellow">TEM MAIS!</span></h2>
          <p className="text-gray-400 mb-12">Você também vai receber...</p>
          
          <div className="inline-flex items-center gap-2 bg-brand-yellow text-black px-6 py-2 rounded-full font-extrabold text-sm mb-16">
            <Plus className="w-4 h-4" /> 4 BÔNUS EXCLUSIVOS
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bonuses.map(bonus => (
              <div key={bonus.id} className="bg-white rounded-3xl overflow-hidden flex flex-col group hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <img src={bonus.img} alt={bonus.title} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform" loading="lazy" decoding="async" />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-brand-yellow text-black px-4 py-1 rounded-full font-black text-[10px] whitespace-nowrap shadow-lg">
                    #{bonus.id} - BÔNUS HOJE!
                  </div>
                </div>
                <div className="p-6 flex flex-col h-full bg-white text-black text-left">
                  <h4 className="font-black text-lg leading-tight mb-4 uppercase">{bonus.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed grow">{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Pricing Section */}
      <section id="offer" className="bg-white text-black py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle className="text-black mb-4 font-black">ESCOLHA SEU PLANO E <span className="text-green-600">COMECE AGORA</span></SectionTitle>
          <div className="bg-brand-red/10 text-brand-red px-6 py-2 rounded-full inline-flex items-center gap-2 font-bold mb-12">
            <Clock className="w-4 h-4" /> OFERTA DISPONÍVEL SOMENTE HOJE, {currentDate}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="border-2 border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center relative hover:border-brand-yellow/30 transition-all hover:shadow-xl">
              <h3 className="text-2xl font-black uppercase mb-8">PLANO BÁSICO</h3>
              <div className="mb-10 px-4">
                <img src="https://i.imgur.com/lcN01Ka.png" className="w-48 h-auto" alt="Básico" loading="lazy" decoding="async" />
              </div>
              <ul className="space-y-4 mb-12 w-full text-left text-sm">
                <li className="flex gap-2"><Check className="w-5 h-5 text-yellow-500 shrink-0" /> Criação Lucrativa de Galinha Caipira</li>
                <li className="flex gap-2 text-gray-300 italic"><X className="w-5 h-5 text-gray-300 shrink-0" /> Sem os 4 Bônus Exclusivos</li>
              </ul>
              <div className="mt-auto">
                <p className="text-gray-400 line-through text-sm">de R$97,00 por:</p>
                <p className="text-4xl font-black text-brand-blue mb-2">R$9,90</p>
                <p className="text-xs text-gray-500 mb-8">pagamento único</p>
                <Button 
                  onClick={() => {
                    trackIC();
                    setShowUpsell(true);
                  }} 
                  className="w-full bg-green-600 hover:bg-green-500 text-white"
                >
                  QUERO O BÁSICO <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Complete Plan */}
            <div className="border-4 border-brand-yellow rounded-[2.5rem] p-10 flex flex-col items-center relative bg-yellow-50 shadow-2xl scale-105 z-10">
              <div className="absolute -top-4 bg-brand-yellow text-black px-6 py-1 rounded-full font-black text-xs">
                MAIS VENDIDO - PLANO COMPLETO
              </div>
              <h3 className="text-2xl font-black uppercase mb-8">PLANO COMPLETO</h3>
              <div className="mb-10 px-4">
                <img src="https://i.imgur.com/lcN01Ka.png" className="w-56 h-auto" alt="Completo" />
              </div>
              <div className="bg-brand-blue text-white w-full py-2 px-4 rounded-xl text-xs font-bold mb-4 text-center shadow-lg">
                TODOS OS BÔNUS INCLUSOS
              </div>

              {/* Scarcity Timer */}
              <div className="flex flex-col items-center mb-6 bg-brand-red/5 w-full py-3 rounded-2xl border border-brand-red/10 group">
                <div className="flex items-center gap-2 text-brand-red font-black animate-pulse group-hover:scale-105 transition-transform">
                  <Clock className="w-5 h-5" />
                  <span className="text-2xl tabular-nums">{formatTime(offerTime)}</span>
                </div>
                <p className="text-brand-red text-[10px] font-bold uppercase mt-1 tracking-wider">Aproveite! Esta oferta expira em instantes</p>
              </div>

              <ul className="space-y-2 mb-12 w-full text-left text-sm overflow-y-auto max-h-60">
                <li className="flex gap-2"><Check className="w-5 h-5 text-yellow-500 shrink-0" /> Criação Lucrativa de Galinha Caipira</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-yellow-500 shrink-0" /> Bônus #1: Guia de Ração Caseira</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-yellow-500 shrink-0" /> Bônus #2: Guia de Doenças</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-yellow-500 shrink-0" /> Bônus #3: Estratégia para Vender Ovos</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-yellow-500 shrink-0" /> Bônus #4: Modelo de Galinheiro</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-yellow-500 shrink-0" /> Acesso Vitalício</li>
              </ul>
              <div className="mt-auto">
                <p className="text-gray-400 line-through text-sm">de R$197,00 por:</p>
                <p className="text-5xl font-black text-green-600 mb-2">R$15,00</p>
                <p className="text-sm font-bold text-yellow-600 mb-8">MELHOR OPÇÃO - COMPLETO</p>
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Button 
                    onClick={() => {
                      trackIC();
                      window.location.href = getRedirectUrl('https://checkout.bigmaney.com/checkout/cmp35t4dv00651yrmzf0bdrj2?offer=ID10LKZ');
                    }}
                    className="w-full bg-green-600 hover:bg-green-500 shadow-xl shadow-green-600/20 text-white font-bold"
                  >
                    QUERO ADQUIRIR O MEU <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>
                <div className="mt-4">
                  <p className="text-brand-red font-black text-xs uppercase mb-1">
                    🔥 APROVEITE AGORA: Você não vai encontrar esse preço depois!
                  </p>
                  <p className="text-gray-500 text-[10px] font-bold">
                    7 dias de garantia incondicional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Guarantee Section */}
      <section className="bg-white text-black py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
          <img 
            src="https://centraldaeducacao.site/assets/garantia-7-dias-Cl5MZ2Dc.webp" 
            alt="Garantia de 7 dias" 
            className="w-32 h-auto flex-shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <h3 className="text-2xl font-black uppercase mb-2">GARANTIA INCONDICIONAL DE 7 DIAS</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Se por qualquer motivo você não ficar satisfeito com o material, basta solicitar o reembolso em até 7 dias após a compra e devolveremos <span className="font-bold text-black italic">100% do seu investimento</span>. Sem perguntas, sem burocracia.</p>
          </div>
        </div>
      </section>

      {/* 12. Testimonials Section */}
      <section className="bg-white text-black py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle className="text-black mb-12 uppercase">QUEM JÁ USOU, <span className="bg-brand-yellow px-2">APROVOU</span></SectionTitle>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { name: "João Batista", role: "Produtor Rural — Uberaba MG", text: "Eu tinha um quintal aqui parado e não sabia nem por onde começar. Depois que peguei o material, consegui organizar tudo e já comecei a produzir ovos." },
              { name: "Carlos Henrique", role: "Pequeno Produtor — Sinop MT", text: "Eu ficava só na tentativa e erro, perdia tempo e dinheiro. Com esse material consegui organizar minha criação e hoje já tenho renda entrando." },
              { name: "José Aparecido", role: "Aposentado Rural — Goiânia GO", text: "Antes eu olhava pro quintal e não sabia o que fazer. Agora já comecei minha criação e ficou muito mais fácil trabalhar." }
            ].map((t, i) => (
              <Card key={i} className="bg-gray-50 border-gray-100 flex flex-col gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 italic">"{t.text}"</p>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-brand-blue">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Step Process Section */}
      <section className="bg-brand-blue py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <SectionTitle className="mb-16">COMECE A ORGANIZAR <span className="text-brand-yellow">EM MINUTOS</span></SectionTitle>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Escolha seu plano", desc: "Clique no botão e escolha o plano ideal para sua necessidade.", icon: MessageCircle },
              { title: "Receba o acesso", desc: "Em poucos segundos o material chega no seu WhatsApp e no seu e-mail.", icon: Smartphone },
              { title: "Abra o Material", desc: "Acesse pelo celular, tablet ou se preferir pela tela do computador.", icon: BookOpen },
              { title: "Comece Sua Criação", desc: "Comece a produzir ovos e transformar seu quintal em renda.", icon: Target }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center group">
                <div className="w-16 h-16 bg-brand-yellow text-black rounded-full flex items-center justify-center font-black text-2xl mb-6 relative z-10 group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-lg mb-2 uppercase">{step.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <Button onClick={scrollToOffer} className="mt-16 w-full max-w-sm">QUERO MEU ACESSO AGORA <ChevronRight className="w-5 h-5" /></Button>
        </div>
      </section>

      {/* 14. FAQ Section */}
      <section className="bg-white text-black py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle className="text-black mb-12 uppercase">PERGUNTAS <span className="text-brand-yellow">FREQUENTES</span></SectionTitle>
          
          <div className="space-y-4">
            {faqData.map((item, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-4">
                <button 
                  onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-lg hover:text-blue-600 transition-colors"
                >
                  {item.q}
                  <ChevronDown className={`w-5 h-5 transition-transform ${activeFAQ === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFAQ === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-gray-600 text-sm">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Footer */}
      <footer className="bg-white text-black py-12 px-4 border-t border-gray-100 italic text-center">
        <div className="max-w-4xl mx-auto">
          <h4 className="font-black text-2xl mb-8 uppercase tracking-tighter">CRIAÇÃO LUCRATIVA DE <span className="text-brand-blue">GALINHA CAIPIRA</span></h4>
          <p className="text-xs text-gray-500 mb-4 opacity-50 uppercase tracking-widest font-bold">© 2026 Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6 text-[10px] text-gray-500 font-bold uppercase mb-8 not-italic">
            <a href="#" className="hover:text-black">Termos de Uso</a>
            <a href="#" className="hover:text-black">Políticas de Privacidade</a>
          </div>
          <p className="text-[10px] text-gray-600 max-w-2xl mx-auto leading-relaxed not-italic">
            Este site não é afiliado ao Meta, Facebook ou Instagram. Depois que você sair do Instagram ou Facebook, a responsabilidade não é deles e sim do nosso site. Trabalhamos para que você tenha a melhor experiência possível.
          </p>
        </div>
      </footer>
      <SocialProof />

      {/* Upsell Popup */}
      <AnimatePresence>
        {showUpsell && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpsell(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-zinc-900 border border-brand-yellow/20 w-full max-w-lg rounded-[2rem] p-8 md:p-12 text-center shadow-2xl shadow-brand-yellow/10 overflow-hidden"
            >
              {/* Highlight Background Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-brand-yellow" />
              
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase mb-4 leading-tight">
                ESPERA, PATRÃO… <br />
                <span className="text-brand-yellow">NÃO COMPRA AINDA</span>
              </h2>
              
              <p className="text-zinc-400 font-medium mb-6 text-sm md:text-base px-4">
                Por praticamente o mesmo valor, você leva tudo completo e evita erro no seu sítio
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red px-4 py-2 rounded-xl flex items-center gap-2 font-black text-xs md:text-sm">
                  <Clock className="w-4 h-4 animate-pulse" />
                  A oferta expira em: {formatTime(timeLeft)}
                </div>
              </div>
              
              <div className="space-y-3 mb-8 text-left max-w-xs mx-auto">
                {[
                  "Guia Completo + 4 Bônus Exclusivos",
                  "Receitas de Ração Caseira",
                  "Manual de Doenças e Curas",
                  "Acesso Vitalício"
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 text-white font-bold text-xs md:text-sm">
                    <Check className="w-5 h-5 text-brand-yellow shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mb-8">
                <p className="text-zinc-500 line-through text-xs md:text-sm font-bold mb-1 uppercase">De R$197,00</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-brand-yellow text-2xl font-black uppercase">Por apenas</span>
                  <span className="text-4xl md:text-5xl font-black text-white leading-none">R$12,90</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => {
                      trackIC();
                      window.location.href = getRedirectUrl('https://checkout.bigmaney.com/checkout/cmp35t4dv00651yrmzf0bdrj2?offer=MNKSHCO');
                    }}
                    className="w-full bg-brand-yellow hover:bg-yellow-400 text-black shadow-xl shadow-brand-yellow/20"
                  >
                    QUERO O COMPLETO E EVITAR ERRO
                  </Button>
                </motion.div>
                
                <button
                  onClick={() => {
                    trackIC();
                    window.location.href = getRedirectUrl('https://checkout.bigmaney.com/checkout/cmp35t4dv00651yrmzf0bdrj2?offer=4X90TB1');
                  }}
                  className="text-zinc-500 hover:text-white text-xs font-bold uppercase transition-colors"
                >
                  Não, quero continuar no plano básico
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
