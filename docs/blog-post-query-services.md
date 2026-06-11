# Services de leitura do blog

## O que foi implementado

Foram adicionados os services de leitura de posts do blog:

- `GetPostBySlugService`: busca um post pelo `slug`, valida visibilidade e dispara incremento de views.
- `ListPostsService`: lista posts com filtros opcionais e paginação.
- `PrismaPostsRepository`: concentra as consultas Prisma necessárias para leitura, contagem e incremento de views.
- `makeGetPostBySlugService` e `makeListPostsService`: factories que instanciam `PrismaPostsRepository` e retornam os services.

Também foi criado `PostNotFoundError` para o fluxo de post não encontrado ou invisível para visitantes.

## Como funciona a busca por slug

O `GetPostBySlugService` recebe:

```ts
{
	slug: string;
	isAdmin?: boolean;
}
```

O service chama `postsRepository.findBySlug(slug)` e retorna o post completo com `author` e `categories`.

Se o post não existir, lança `PostNotFoundError`.

Se `isAdmin` for `false` ou não for informado, apenas posts com status `PUBLICADO` podem ser retornados. Posts `RASCUNHO` ou `ARQUIVADO` também geram `PostNotFoundError`, para não revelar a existência de conteúdo interno.

Depois da validação de visibilidade, o service dispara:

```ts
void postsRepository.incrementViewCount(post.id);
```

Esse `void` deixa o incremento não-bloqueante: a resposta não espera a atualização do contador terminar.

## Como funciona a listagem

O `ListPostsService` recebe:

```ts
{
	status?: PostStatus;
	categorySlug?: string;
	search?: string;
	page?: number;
	limit?: number;
	isAdmin?: boolean;
}
```

Para visitantes, ou seja, quando `isAdmin` é `false` ou não informado, o service força `status = "PUBLICADO"`. Mesmo que o caller envie outro status, visitantes recebem somente posts publicados.

Para admin, o filtro `status` informado é respeitado. Se admin não enviar `status`, a listagem pode trazer posts de qualquer status.

Os defaults de paginação são:

- `page = 1`
- `limit = 10`
- `limit` máximo de `50`

O retorno tem o formato:

```ts
{
	posts,
	total,
	page,
	limit,
	totalPages: Math.ceil(total / limit),
}
```

## Filtros aplicados no Prisma

O `PrismaPostsRepository.list` monta um `where` do Prisma conforme os filtros:

- `status`: filtra diretamente `Post.status`.
- `categorySlug`: filtra posts que possuam uma categoria relacionada com o slug informado.
- `search`: busca case-insensitive em `title`, `summary` e `content`.

A listagem usa `Promise.all` para buscar os posts e contar o total com o mesmo filtro. Assim, `totalPages` é calculado a partir do total real de resultados filtrados.

Os posts são ordenados por `publishedAt desc` e depois `createdAt desc`.
