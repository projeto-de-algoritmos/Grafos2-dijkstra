# Lift Hopping

Para melhor entender o funcionamento do algoritmo de *Dijkstra*, criamos a vizualização da solução *Accepted* da questão número **10801** do *UVA*.

Esta questão consiste em um prédio no qual os elevadores não param obrigariamente em todos os andares do prédio, sendo necessário, algumas vezes descer, ou não, para pegar o elevador para o andar desejado. Dessa forma, qual a rota mais rápida para um determinado andar, dado o tempo que um elevador demora para subir entre dois andares consecutivos e o tempo de espera para a troca de elevadores.

Para se aprofundar mais no contexto da questão, aqui está o [link](https://onlinejudge.org/external/108/10801.pdf) do enunciado.

![start](/frontend/src/assets/start.png)
![path](/frontend/src/assets/path.png)

## Implementação

O grafo é montado usando o esquema de *hashes* de forma que cada os andares que os elevadores param, são representados por nós diferentes. Quando há dois elevadores que param em um mesmo andar existe uma ligação entre os mesmos com o peso de 60s. É importante frizar, que se trata de um grafo não-direcionado.

Ao chamar *Dijkstra* é passado como argumento inicial todos os nós que partem do nível térreo (0) e para poder saber em qual elevador que chega ao andar com menor tempo, o mínimo entre todos os tempos de elevadores que param no mesmo andar.

Por fim, é feito o *backtracking*, uma vez que todas as vezes que uma distância era atualizada, foi guardado o nó anterior, viabilizando remontar o caminho percorrido pelo algoritmo.

## UVA Online Judge Veredict

![veredict](/frontend/src/assets/accepted.jpg)

# Como Usar

1. Clone o repositório
2. Dentro de ```/backend``` execute ```npm install``` e em seguida ``` npm start``` e deixe o servidor rodando
3. Em outro terminal entre no diretório ```/frontend``` e instale as dependência com ```npm install``` e logo em seguida execute ```npm start```
4. Acesse localmente em localhost:3000 por padrão

## Developers

<table border="0">
    <tr>
        <td> <img src="https://avatars3.githubusercontent.com/u/29265857?s=460&v=4"> </td>
        <td> <img src="https://avatars3.githubusercontent.com/u/42387946?s=460&v=4"> </td>
    </tr>
    <tr>
        <td align="center"> <a href="https://github.com/youssef-md"> Youssef Muhamad </a> <br> 17/0024334 </td>
        <td align="center"> <a href="https://github.com/rogerioo"> Rogério Júnior </a> <br> 17/0021751 </td>
    </tr>
</table>


<hr/>
<p align="center"><b>Lift Hopping</b></p>
<p align="center">Projeto e Análise de Algoritmos - 2º/2019<br /><br />
<a href="https://fga.unb.br" target="_blank"><img width="230"src="https://4.bp.blogspot.com/-0aa6fAFnSnA/VzICtBQgciI/AAAAAAAARn4/SxVsQPFNeE0fxkCPVgMWbhd5qIEAYCMbwCLcB/s1600/unb-gama.png"></a>
</p>
