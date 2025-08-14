import type { OpenAPIV3 } from "openapi-types";
import { swaggerSpec } from "./swaggerConfig";

// Definições das rotas da API
export const swaggerPaths: OpenAPIV3.PathsObject = {
	"/": {
		get: {
			tags: ["Health Check"],
			summary: "Verificação de saúde da API",
			description:
				"Retorna uma mensagem confirmando que a API está funcionando",
			responses: {
				"200": {
					description: "API funcionando corretamente",
					content: {
						"text/plain": {
							schema: {
								type: "string",
								example: "API Node.js",
							},
						},
					},
				},
			},
		},
	},
	"/users": {
		post: {
			tags: ["Usuários"],
			summary: "Registrar novo usuário",
			description:
				"Cria um novo usuário no sistema. O tipo de usuário (PLAYER/MASTER) é determinado pelo campo masterConfirm. Se masterConfirm=true, o campo enrollment torna-se obrigatório.",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/RegisterRequest",
						},
						examples: {
							player: {
								summary: "Registro de Jogador",
								value: {
									name: "João Silva",
									email: "joao@exemplo.com",
									password: "senha123",
									phoneNumber: "(11) 99999-9999",
									masterConfirm: false,
								},
							},
							master: {
								summary: "Registro de Mestre",
								value: {
									name: "Maria Santos",
									email: "maria@exemplo.com",
									password: "senha123",
									enrollment: "123456789",
									phoneNumber: "(11) 88888-8888",
									masterConfirm: true,
								},
							},
						},
					},
				},
			},
			responses: {
				"201": {
					description: "Usuário criado com sucesso",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/User",
							},
						},
					},
				},
				"400": {
					description:
						"Dados inválidos ou matrícula obrigatória para mestres não informada",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
							examples: {
								validation: {
									summary: "Erro de validação",
									value: {
										message: "Dados inválidos",
									},
								},
								masterEnrollment: {
									summary: "Matrícula obrigatória para mestres",
									value: {
										message: "Masters require enrollment",
									},
								},
							},
						},
					},
				},
				"409": {
					description: "Email já existe",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
							example: {
								message: "User with this email already exists",
							},
						},
					},
				},
			},
		},
	},
	"/users/authenticate": {
		post: {
			tags: ["Autenticação"],
			summary: "Fazer login",
			description: "Autentica um usuário e retorna um token JWT",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/LoginRequest",
						},
					},
				},
			},
			responses: {
				"200": {
					description: "Login realizado com sucesso",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/AuthResponse",
							},
						},
					},
				},
				"400": {
					description: "Dados inválidos",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
				"401": {
					description: "Credenciais inválidas",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
			},
		},
	},
	"/my-emmitted-sessions": {
		get: {
			tags: ["Usuários"],
			summary: "Buscar sessões emitidas pelo usuário",
			description: "Retorna todas as sessões criadas pelo usuário logado",
			security: [
				{
					bearerAuth: [],
				},
			],
			responses: {
				"200": {
					description: "Lista de sessões emitidas",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/Session",
								},
							},
						},
					},
				},
				"401": {
					description: "Token inválido ou expirado",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
			},
		},
	},
	"/my-enrolled-sessions": {
		get: {
			tags: ["Usuários"],
			summary: "Buscar sessões nas quais o usuário está inscrito",
			description:
				"Retorna todas as sessões nas quais o usuário logado está inscrito",
			security: [
				{
					bearerAuth: [],
				},
			],
			responses: {
				"200": {
					description: "Lista de sessões inscritas",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/Session",
								},
							},
						},
					},
				},
				"401": {
					description: "Token inválido ou expirado",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
			},
		},
	},
	"/sessions/approved": {
		get: {
			tags: ["Sessões"],
			summary: "Buscar sessões aprovadas",
			description:
				"Retorna todas as sessões aprovadas e disponíveis para inscrição",
			responses: {
				"200": {
					description: "Lista de sessões aprovadas",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/Session",
								},
							},
						},
					},
				},
			},
		},
	},
	"/sessions": {
		get: {
			tags: ["Sessões"],
			summary: "Buscar todas as sessões (Admin)",
			description:
				"Retorna todas as sessões do sistema (apenas para administradores)",
			security: [
				{
					bearerAuth: [],
				},
			],
			responses: {
				"200": {
					description: "Lista de todas as sessões",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/Session",
								},
							},
						},
					},
				},
				"401": {
					description: "Token inválido ou expirado",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
				"403": {
					description: "Acesso negado - apenas administradores",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
			},
		},
		post: {
			tags: ["Sessões"],
			summary: "Criar nova sessão (Master)",
			description:
				"Cria uma nova sessão RPG com múltiplas datas possíveis. Apenas mestres podem criar sessões. A sessão criada fica com status PENDENTE até aprovação de um administrador.",
			security: [
				{
					bearerAuth: [],
				},
			],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateSessionRequest",
						},
						example: {
							title: "Campanha de D&D: A Maldição de Strahd",
							description:
								"Uma aventura gótica de horror em Barovia, onde os heróis devem enfrentar o vampiro Conde Strahd von Zarovich.",
							requirements:
								"Conhecimento básico de D&D 5e, disponibilidade para sessões semanais",
							system: "D&D 5e",
							possibleDates: [
								"2024-12-31T20:00:00.000Z",
								"2025-01-07T20:00:00.000Z",
								"2025-01-14T20:00:00.000Z",
							],
							period: "NOITE",
							minPlayers: 3,
							maxPlayers: 6,
							location: "Sala 201 - Prédio de Humanas",
						},
					},
				},
			},
			responses: {
				"201": {
					description: "Sessão criada com sucesso",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Session",
							},
						},
					},
				},
				"400": {
					description: "Dados inválidos ou mestre já possui sessão pendente",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
							examples: {
								validation: {
									summary: "Dados inválidos",
									value: {
										message: "Dados da sessão são inválidos",
									},
								},
								pendingSession: {
									summary: "Sessão pendente existe",
									value: {
										message: "Master already has a pending session",
									},
								},
							},
						},
					},
				},
				"401": {
					description: "Token inválido ou expirado",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
				"403": {
					description: "Acesso negado - apenas mestres podem criar sessões",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
			},
		},
	},
	"/sessions/{sessionId}/subscribe": {
		post: {
			tags: ["Sessões"],
			summary: "Inscrever-se em uma sessão",
			description: "Inscreve o usuário logado em uma sessão específica",
			security: [
				{
					bearerAuth: [],
				},
			],
			parameters: [
				{
					name: "sessionId",
					in: "path",
					required: true,
					description: "ID da sessão",
					schema: {
						type: "string",
					},
				},
			],
			responses: {
				"200": {
					description: "Inscrição realizada com sucesso",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									message: {
										type: "string",
										example: "Inscrição realizada com sucesso",
									},
								},
							},
						},
					},
				},
				"400": {
					description: "Sessão lotada ou usuário já inscrito",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
				"401": {
					description: "Token inválido ou expirado",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
				"404": {
					description: "Sessão não encontrada",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
			},
		},
	},
	"/sessions/{sessionId}/approve": {
		patch: {
			tags: ["Sessões"],
			summary: "Aprovar sessão (Admin)",
			description: "Aprova uma sessão pendente (apenas para administradores)",
			security: [
				{
					bearerAuth: [],
				},
			],
			parameters: [
				{
					name: "sessionId",
					in: "path",
					required: true,
					description: "ID da sessão",
					schema: {
						type: "string",
					},
				},
			],
			responses: {
				"200": {
					description: "Sessão aprovada com sucesso",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Session",
							},
						},
					},
				},
				"401": {
					description: "Token inválido ou expirado",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
				"403": {
					description: "Acesso negado - apenas administradores",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
				"404": {
					description: "Sessão não encontrada",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
			},
		},
	},
	"/sessions/{sessionId}/reject": {
		patch: {
			tags: ["Sessões"],
			summary: "Rejeitar sessão (Admin)",
			description: "Rejeita uma sessão pendente (apenas para administradores)",
			security: [
				{
					bearerAuth: [],
				},
			],
			parameters: [
				{
					name: "sessionId",
					in: "path",
					required: true,
					description: "ID da sessão",
					schema: {
						type: "string",
					},
				},
			],
			responses: {
				"200": {
					description: "Sessão rejeitada com sucesso",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Session",
							},
						},
					},
				},
				"401": {
					description: "Token inválido ou expirado",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
				"403": {
					description: "Acesso negado - apenas administradores",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
				"404": {
					description: "Sessão não encontrada",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Error",
							},
						},
					},
				},
			},
		},
	},
};

// Merge paths com swaggerSpec
swaggerSpec.paths = swaggerPaths;
