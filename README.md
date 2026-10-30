# Hodegres — site institucional

Site estático de consultoria PostgreSQL em https://hodegres.com/.

## Desenvolvimento

Sem dependências ou etapa de build. Para visualizar:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Arquivos de entrada: `index.html`, `style.css` e `app.js`. Imagens e fonte em `assets/`. O arquivo `CNAME` mantém o domínio personalizado; `.nojekyll` permite servir diretamente os arquivos estáticos no GitHub Pages.

## Contato

O formulário prepara uma mensagem para `contato@hodegres.com`. O visitante revisa e envia pelo aplicativo de e-mail. Não há armazenamento de dados nem confirmação de envio automático.

## Consultoria

Modalidades: diagnóstico PostgreSQL, projeto de evolução e acompanhamento contínuo. Incluem monitoramento, health-checks, refactoring de SQL, tuning, upgrades e migrações. Valores, prazos, janelas de atendimento e SLA são definidos por proposta. Zero downtime depende da aplicação, das versões e do método de migração, com ensaio e validação do cutover.

## Telas do produto

As capturas de clusters e health-checks usam a interface real do Hodegres.monitor com dados inteiramente fictícios. São imagens estáticas, identificadas como demonstração. Não contêm informações de clientes e não se conectam ao backend.

## Referências técnicas

- https://www.postgresql.org/docs/current/monitoring-stats.html
- https://www.postgresql.org/docs/current/using-explain.html
- https://www.postgresql.org/docs/current/logical-replication.html
