import './App.css'
import axios from 'axios'
import {useState,useEffect} from 'react'
import Header from './layouts/header/header'
import { Dashboard } from './layouts/dashboard/dashboard'
import FileSaver from "file-saver";


function App() {

  const [result,setResult] = useState([])
  const [send,setSend] = useState(false)
  const [message,setMessage] = useState(Array<Object>)
  const [messageSucess,setMessageSuccess] = useState(Array<Object>)
  const [validar,setValidar] = useState(false)
  const [dadosPlanilha,setPlanilha] = useState(Array<any>)
  const [load,setLoad] = useState(false)
  
  async function requisicao(){
    
    const fileInput = document.querySelector('#fileInput');
    const file = fileInput.files[0];
   
    if (!file) {
      alert('Por favor, selecione um arquivo para fazer o upload.');
      return;
    }

    const formData = new FormData();
      formData.append('file', file);
  
    
    await axios.post('http://localhost:8000/upload',formData).then((success) => {
      console.log(file)
      if(file.type !== 'text/csv'){
        alert('arquivo incorreto, por favor baixe o modelo')
        return
      }
      console.log(success.data)
    
      setResult((success.data).planilha)
      setSend(true)
      trazerDados((success.data).planilha)
    })
   
  }
  async function enviar(){
  
    if(send == true){
      await axios.post('http://localhost:8000/',result).then((success) => {
       
        if((success.data).erro){
          setMessage((success.data).erro)
          return
        } else {
          setMessageSuccess([{success:'Produtos validados com sucesso'}])
          setTimeout(() => {
            setLoad(true)
          }, 2000);
      
         //setLoad(true)
        }
       
      })
    }
  }
  async function atualizar(){
    if(send == true){
      await axios.post('http://localhost:8000/atualizar',result).then((success) => {

        if((success.data).erro){
          setMessage((success.data).erro)
          return
        } else {
          setMessageSuccess([{success:'Produtos atualizados com sucesso'}])
          document.querySelector('#fileInput').value = ''
        }
      
      })
    }
  }
  
  async function baixarModelo(){

    await axios.get('http://localhost:8000/consultar').then((success) => {
      const data:Array<any> = success.data
      const csvData = 'product_code,new_price\n' + data.map((item) => `${item.code},${item.sales_price}`).join('\n');
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      FileSaver.saveAs(blob, 'atualizacao_preco_exemplo.csv');

    })
  }

 async function trazerDados(dados:Array<any>){
 
 const arrayResult: Array<any>= []

  dados.forEach(async(e,i) => {
      let code:number = parseInt(dados[i].product_code)
      let data:any = {product_code:code}
       
      await axios.post('http://localhost:8000/validar',data).then((success) => {
      
      arrayResult.push(success.data)
    })
   
    
  })
  console.log({result: arrayResult})
  setPlanilha(arrayResult)
 }



  return (
    <>
      <Header />
      <div className="container">
        <Dashboard requisicao={requisicao} enviar={enviar} result={result} message={message} success={messageSucess} atualizar={atualizar} validar={validar} baixarModelo={baixarModelo} dadosPlanilha={dadosPlanilha} load={load}/>
      </div>
    </>
  )
}

export default App
