// URL base do seu site (substitua pelo seu domínio quando publicar)
const siteUrl = 'https://motivacionais.com.br';

// Lista de páginas estáticas
const staticPages = ['']; // Representa a Homepage ('/')

// Lista de categorias (baseado no seu +page.svelte)
// const categories = [
//     'motivacao',
//     'trabalho',
//     'superacao',
//     'autoestima',
//     'foco',
//     'quantico',
//     'lideranca',
//     'espiritualidade',
//     'gratidao',
//     'positividade',
//     'bom_dia',
//     'humor'
// ];

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    
    // Constrói as URLs das páginas estáticas
    const staticPageUrls = staticPages.map(page => 
        `<url>
            <loc>${siteUrl}/${page}</loc>
            <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>`
    ).join('');

    // Constrói as URLs das categorias (que são páginas dinâmicas no seu app)
    // NOTA: No seu app, a categoria é selecionada na própria home, 
    // mas se cada categoria tivesse uma URL própria (ex: /categoria/motivacao),
    // elas seriam adicionadas aqui. 
    // Como seu app é um "Single Page App" (SPA) que muda o conteúdo na home,
    // apenas a home é indexável por enquanto.
    
    // *** AJUSTE IMPORTANTE ***
    // Visto que seu app não parece ter URLs separadas para categorias
    // (ex: /trabalho, /foco), mas sim que tudo acontece na página inicial,
    // o sitemap mais correto por *enquanto* é apenas o da Home.
    
    // Se no futuro você criar páginas como /categoria/[id], você deve adicionar o loop
    // das categorias aqui.

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPageUrls}
    </urlset>`;

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=3600' // Cache de 1 hora
        }
    });
}