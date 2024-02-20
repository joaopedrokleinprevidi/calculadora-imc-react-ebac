import './App.css';
import { useState } from 'react';

function App() {

  let nomeVerificar;
  let alturaVerificar;
  let pesoVerificar;
  let content;

  const [nome, setNome] = useState('');
  const [altura, setAltura] = useState(0.00);
  const [peso, setPeso] = useState(0);
  const [imc, setIMC] = useState(0);
  const [classificacao, setClassificacao] = useState('')

  function enviarForm(event){
    event.preventDefault()

    nomeVerificar = event.target.nome.value;
    alturaVerificar = event.target.altura.value;
    pesoVerificar = event.target.peso.value;

    alturaVerificar = String(alturaVerificar)
    pesoVerificar = String(pesoVerificar)
    
    if((nomeVerificar.length >= 3) && (alturaVerificar.length >= 3) && (pesoVerificar.length >= 1) ) {

      if(alturaVerificar.includes(',')){
        alturaVerificar = alturaVerificar.replace(',', '.')
      }
      if(!alturaVerificar.includes('.')){
        alturaVerificar = alturaVerificar.slice(0, 1) + '.' + alturaVerificar.slice(1);
      }
      if(pesoVerificar.includes(',')){
        pesoVerificar = pesoVerificar.replace(',', '.')
      }

      alturaVerificar = Number(alturaVerificar)
      pesoVerificar = Number(pesoVerificar)

      const alturaMetros = alturaVerificar / 1.00;
      const calculoIMC = pesoVerificar / (alturaMetros * alturaMetros);
      setIMC(calculoIMC.toFixed(2));

      setNome(nomeVerificar);
      setAltura(alturaVerificar);
      setPeso(pesoVerificar)

      // Classificação do IMC
      if (calculoIMC < 18.5) {
        setClassificacao('Abaixo do peso');
      } else if (calculoIMC >= 18.5 && calculoIMC < 24.9) {
        setClassificacao('Peso normal');
      } else if (calculoIMC >= 25 && calculoIMC < 29.9) {
        setClassificacao('Sobrepeso');
      } else if (calculoIMC >= 30 && calculoIMC < 34.9) {
        setClassificacao('Obesidade grau 1');
      } else if (calculoIMC >= 35 && calculoIMC < 39.9) {
        setClassificacao('Obesidade grau 2');
      } else {
        setClassificacao('Obesidade grau 3');
      }
    }
  }

  if (classificacao.length >= 1){
    content =       
      <div className="flex">
      <p>IMC: Olá {nome}, você atingiu o IMC de: {imc}</p>
      <p>Peso: {peso}</p> <p>Altura: {altura}</p>
      <p>Classificação na tabela: {classificacao}</p>
      </div>
  }

  return (
    <div className="body">
    <header className="flex">
      <h1>Projeto Ebac - Calculator IMC</h1>
    </header>
    <main className="flex">
      <form className="flex" onSubmit={enviarForm}>
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" placeholder="João"/>

        <label htmlFor="altura">Altura (m)</label>
        <input type="number" id="altura" name="altura" placeholder="1.74" step="0.01"/>

        <label htmlFor="peso">Peso (kg)</label>
        <input type="number" id="peso" name="peso" placeholder="66"/>
        <button type="submit"> Enviar </button>
      </form>

      {content}
    </main>
    </div>
  );
}

export default App;
