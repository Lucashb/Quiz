RESUMO DO QUE TA SENDO UTILIZADO NO PROJETO

CORES

	Background #12131C
	

APP (palpiteiros)

	Reatc-Native
	API Axios
	Para autenticação Google Cloud (https://console.cloud.google.com/apis/credentials?project=amazing-thought-347305&supportedpurview=project)
	Chave Secreta do Google Cloud (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)
	ID do Client pra montar a URL de solicitação do email (78124351245-sjknt91v6nk4vfvt3c120q0nogvn6i9o.apps.googleusercontent.com)
	
	Comitado no git (https://github.com/Lucashb/palpiteiros.git)

Serviço WS (palpiteirosWS)

	Node.js
	Sequelize
	
	SUBINDO NODE NO HEROKU (https://dashboard.heroku.com/apps/palpiteirosws/deploy/heroku-git)

		heroku login
		heroku git:clone -a palpiteirosws
		cd palpiteirosws
		git add .
		git commit -am "make it better"
		git push heroku master
		
		MAS É NECESSÁRIO TAMBÉM FAZER O PUSH NO GIT
		
		git push origin master
	
	Comitado no git (https://github.com/Lucashb/palpiteirosws.git)
	
	
BANCO DE DADOS
	
	CONECTAR NO BANCO DE DADOS HEROKU
	
		mysql://b79c07b547e6ce:0d189fa9@us-cdbr-east-05.cleardb.net/heroku_b47cc24a363003c?reconnect=true
	
		Host: us-cdbr-east-05.cleardb.net
		User: b79c07b547e6ce
		Password: 0d189fa9
		Database: heroku_b47cc24a363003c
		
		Reiniciar sequence de tabelas (SELECT setval('public.students_id_seq', 34550, true);)
	
		ACESSAR SERVIÇO https://palpiteirosws.herokuapp.com/


Para chamar a API dos Campeonatos

	Partidas: https://api.football-data.org/v2/competitions/2013/matches

	Token: 0ecf8e42a0a540d48f6b6f19747fc999
	

Comandos Sequelize

	CRIAR OS MIGRATIONS
		npx sequelize migration:create --name=create-NOMETABELA
		
	CRIAR AS TABELAS
		npx sequelize db:migrate
		
		await queryInterface.createTable('brasileiraoas', {
		  id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		  },
		}

	ADD COLUNA
	
		queryInterface.addColumn('Person', 'petName', { type: DataTypes.STRING });
		
	REMOVER COLUNA
	
		queryInterface.removeColumn('Person', 'petName', { /* query options */ });
		
		async up (queryInterface, Sequelize) {
			await queryInterface.removeColumn(
				'partidasusuarios',
				'id_partidas_usuarios'
			);
		},

	ALTERAR COLUNA
	
		await queryInterface.changeColumn('usuariosbrasileiraoas', 'id_partida_brasileirao_a', {
		  type: Sequelize.INTEGER,
		  allowNull: false,
		  references: {
			model: 'brasileiraoas',
			key: 'id'
		  }
		});
		
	Drop Tabela
		
		await queryInterface.dropTable('campeonatobrasileiraoas');
		
		
RELOAD NO PROJETO

	rm -rf node_modules && npm install
	
PARA SUBIR NA AWS (https://www.youtube.com/watch?v=FQ3QwvtWiMA) (NÃO USAMOS MAIS)

	USAR ISSO
	
		IP Pulbico: 52.87.217.92
		Conectar na maquina AWS: ssh -i C:/LucasNode/palpiteiros_chave.pem ubuntu@52.87.217.92
		
		Depois rodar os scripts:
		
			sudo apt-get update -y
			sudo apt-get upgrate -y
			sudo apt install nodejs -y
			sudo apt install npm -y
			sudo npm cache clean -f
			sudo npm install -g n
			sudo n stable
			sudo npm install pm2 -g
			sudo npm install yarn -g
			
	    Fazer clone do GIT direto de dentro da maquina na AWS
		
		pm2 start src/server.js ou pm2 start src/server.js -xn 'palpiteiros'
		pm2 log
		pm2 ls: mostra uma lista de todas as aplicações sendo executadas.
		pm2 stop nomeprojeto (default)
		
		rmdir -p: deletar diretórios mesmo que nã sejam vazios
		rmdir: deletar diretórios vazios
		
		Arquivos protegidos
		
		sudo chattr -i nomearquivo
		rm -rf nomearquivo


TOKEN do GIT para conectar via SSH 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

GERAR APK COM EXPO ANDROID

	expo build:android


APP PLAY STORE

	Email para suporte: suportepalpiteirosoficial@gmail.com
	Email do Admon: palpiteirosAdmob@gmail.com
	

CONSULTAS

	truncate usuariosbrasileiraoarankings;
	truncate usuariosbrasileiraoas;
	truncate brasileiraoas;
	truncate campeonatos;
	truncate usuarios;

	select * from usuariosbrasileiraoarankings;
	select * from usuariosbrasileiraoas;
	select * from usuarios;
	select * from brasileiraoas;
	select * from campeonatos;

	-- Quantidade de campeonatos
	select count(*) from campeonatos;

	-- Quantidade de usuários
	select count(*) from usuarios;

	-- Se tem ligas duplicadas
	select count(*), a.id_campeonatos, a.id_usuario, a.numero_partida 
	 from usuariosbrasileiraoas a 
	group by a.id_campeonatos, a.id_usuario, a.numero_partida
	order by 1 desc;
	
	-- Se tem usuario duplicado
	select count(*), a.email from usuarios a group by a.email order by 1 desc;
	
APP-ADS.TXT

	Configurado via: https://www.app-ads-txt.com/email/verify
	

ADMINISTRADOR

	INCLUIR CAMPEONATO BRASILEIRAO A
	
		NOME: BRASILEIRAO A
		CODIGO: 2013
		RODADA/STAGE: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
		PREMIO: Qualquer valor que quiser
		STATUS: ABERTO
		VERSAO API: v2 (por enquanto)
	
		ALTERAR CAMPEONATO BRASILEIRAO A 
		
			RODADA/STAGE: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
			CODIGO: 2013
			VERSAO API: v2 (por enquanto)
			
		ENCERRAR RODADA BRASILEIRAO A 
		
			RODADA: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
			CODIGO: 1377
			STATUS: ENCERRADO
		
	INCLUIR CAMPEONATO LIBERTADORES
	
		NOME: LIBERTADORES
		CODIGO: 2152
		RODADA/STAGE: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
		PREMIO: Qualquer valor que quiser
		STATUS: ABERTO
		VERSAO API: v2 (por enquanto)
	
		ALTERAR CAMPEONATO LIBERTADORES 
		
			RODADA/STAGE: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
			CODIGO: 2152
			VERSAO API: v2 (por enquanto)
			
		ENCERRAR RODADA LIBERTADORES
		
			RODADA: (se for campeonato brasileiro RODADA se for campeonato que tem Mata Mata é STAGE)
			CODIGO: 873
			STATUS: ENCERRADO
		
NOTIFICATION EXPO

	CRIAR - https://expo.dev/notifications
	
	TOKEN - ExponentPushToken[d5hHphBiB_mJuNjZr4ll6i]
