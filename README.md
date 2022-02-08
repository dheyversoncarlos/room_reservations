# API de reservas de salas 
### Autor: 
[Dheyverson Carlos](https://github.com/dheyverson)

## Desrição:

    Sistema de reservas de salas

## Pré-requisitos:

- [Docker e docker-compose](https://www.docker.com/get-started)
- [NodeJS v14.17.6 ou superior](https://nodejs.org/en/blog/release/v14.18.2/)

## Como executar o projeto ?

### Passo 1 - Configurando 

- Criar uma cópia do arquivo ".env.example" na raiz do projeto, renomenado a cópia para ".env" 

- Opcionalmente você pode trocar os valores das varíaveis contidas no arquivo .env gerado no passo anterior.

- Criar uma cópia do arquivo "ormconfig.json.example" na raiz do projeto, renomenado a cópia para "ormconfig.json" 

- Caso você tenha personalizado as variáveis no arquivo .env, deverá alterará-las também no arquivo ormconfig.json 

### Passo 2 -  Iniciando o servidor de banco de dados com docker

- Executar na pasta raiz do projeto o comando :
    
        $ docker-compose up --build -d 

### Passo 3 -  Instalando e configurando as dependencias em modo *DEV*

- Executar na pasta raiz do projeto os comandos :
    
    1. Instalando as dependencias node
             
             $ yarn install  ou  npm install 

    2. Construindo o banco de dados com TypeORM
            
            $ yarn typeorm migration:run   ou   npm run typeorm migration:run

    3. Cadastrando salas manualmente no banco de dados
            
            Neste passo, utilize um SGBD de sua preferência para se conectar ao banco de dados
            
            utilize as credenciais definidas no arquivo .env
            
            Execute o script scripts_sql/initdb.sql para cadastrar as salas de teste

            ** Personalize conforme queira o SQL acima, para visualizar salas diferentes na api **
    
    4. Executando a api em modo *DEV*
            
            $ yarn dev   ou   npm run dev

### Passo 4 - Acessando a documentação 

- No navegador de sua preferencia acesse :
        
    [http://HOST_API:PORT_API/api-docs](http://localhost:3000/api-docs)

        *** É possível acessar apenas a rota auth sem autenticação. Após obter um token válido no métode auth, utilize o token para as demais solicitações ***
    
        *** Para testar cada serviço disponibilizado pela api, pode-se utilizar o ambiente disponibilizado no host da documentação ou softwares de terceiros como Postman por exemplo. ***

        *** Utilize a rota [POST: /users] para cadastrar um usuário com o hash de senha e assim obter êxito na autenticação ***

===========================================================REFERÊNCIA===============================================================


# Desafio Técnico - Backend Developer – NodeJs

    "O tempo estimado para o desenvolvimento do teste é de 3 dias. O desafio não é cronometrado e você pode trabalhar no seu ritmo."

1. Sobre o desafio
    Seu desafio é desenvolver uma API que irá auxiliar no processo de reservas de salas. O usuário poderá obter uma lista de salas disponíveis para reservar. Para isso é preciso que a API ofereça informações relevantes ao processo: como lista de salas, detalhes da sala e sua disponibilidade para agendar.

2. Tecnologias requeridas
    - Você deve usar o JavaScript moderno (ES8) e suas melhores práticas;
    - A autenticação deverá ser feita com JWT (Json Web Token);
    - Na escolha da base de dados pode ser utilizada qualquer SGBD, mas de preferência gostaríamos
    que fosse o PostgreSQL;
    - O uso de design patterns, code clean, dto (data transfer object), rest hateoas, etc, são opcionais.
    Mas, caso implementados conseguiremos ter uma melhor leitura de sua organização a nível de código e arquitetura.

3. Detalhamento das entidades
    - Salas
    - Cada sala deve conter, nome, descrição, endereço completo e imagens;
    - As informações de endereço devem conter, logradouro, número, complemento (campo não
    obrigatório), bairro, cidade, estado, país e cep;
    - O cadastro das salas pode ser feito manualmente no banco de dados;
    - Agendas
    - A Agenda deve ser disponibilizada por dia e período (manhã, tarde e noite).;
    - Cada agenda deve estar associada a uma sala;
    - A Agenda deve contar informações de estado (disponível, indisponível e reservada);
    - Não é possível replicar agenda para o mesmo dia, período e sala;
    - O cadastro das agendas pode ser feito manualmente no banco de dados;
    - Usuários
    - Cada usuário deve conter nome, e-mail e avatar.
    - O cadastro dos usuários deve ser feito manualmente no banco de dados.
    - Para o usuário acessar a aplicação é necessário estar autenticado através de e-mail e senha.
    - Para autenticação do usuário ser utilizado o [http://www.passportjs.org] ou algum semelhante.

4. 
    * Requisitos
        - [GET] / - retorna status 200 e um corpo de reposta em branco;
        - [GET] /room?date=2021-05-01 - retorna uma lista de salas com disponibilidade para o dia especifico;
        - [GET] /room/:id – retorna os detalhes de uma sala específica.;
        - [POST] /auth - autenticação do usuário (retorna 200 com um corpo que contém o token jwt ); 
        - [GET] /schedule/:roomId – obter as reservas disponíveis para a uma sala;
        - [POST] /schedule - realiza a reserva da agenda;

    * Não requerido
        - Você não precisa suportar https
        - Seu código não precisa estar pronto para a produção, embora você deva tomar decisões de projeto, trazer soluções para atender os requisitos e ter uma base para que seja possível escalar a aplicação.
    
5. Entrega e implementação
    - Fornece acesso ao código por meio do [https://github.com] ou ferramenta semelhante; 
    - Forneça um README com instruções breves de configuração da aplicação uma visão geral do backend implementado.
    
6. Também será analisado
    - Organização do código;
    - Facilidade da instalação da aplicação para avaliação; 
    - Soluções que atendam os requisitos
    
7. Prazo
    - O prazo máximo para entrega é de 3 dias, a partir da data de recebimento destas instruções.
    
8. Dúvidas
    - Caso tenha alguma dúvida entre em contato pelo e-mail: [hendrik@clina.care] ou [caio@clina.care] com o assunto “Clina - Desafio Técnico Backend - Dúvida”
  
 
