import React, { Fragment, useEffect, useState } from "react";

interface Function {
  requisicao: any;
  enviar: any;
  result: Array<any>;
  message: Array<any>;
  success: Array<any>;
  atualizar: any;
  validar: Boolean;
  baixarModelo: any;
  dadosPlanilha: Array<any>;
}

export const Dashboard: React.FC<Function> = ({
  requisicao,
  enviar,
  result,
  message,
  success,
  atualizar,
  validar,
  baixarModelo,
  dadosPlanilha,
}) => {
  const [dados, setDados] = useState(Array<any>);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let teste: Array<any> = [];

    if (result.length !== 0) {
      dadosPlanilha.map((e) => teste.push(e.array[0][0]));
    }
    console.log({ resultadoDaPlanilha: result });
    console.log({ resultadoDoBanco: teste });

    setDados(teste);

    let resultado:Array<object> = []

    
      teste.forEach((e,i) => {
        
        let productCode:number =teste[i].product_code
        let Code:number = result[i].code

        if(productCode == Code){
          let concac = Object.assign({}, teste[i], result[i]);
          resultado.push(concac)
        }
        setDados(resultado);
        setLoad(true);
        console.log(resultado)
      })
    
   
     
    

  }, [dadosPlanilha, result, requisicao]);

  return (
    <Fragment>
      <section className="row" style={Style.dash}>
        <div className="col-5" style={Style.grid1}>
          <div>
            <h3>Carregue seu arquivo CSV</h3>
            <div>
              <button className="btn btn-warning" onClick={baixarModelo}>
                Baixar planilha com produtos
              </button>
            </div>
            <div className="mt-4">
              <div className="mt-4 d-flex">
                <input
                  className="form-control"
                  type="file"
                  id="fileInput"
                  onChange={requisicao}
                ></input>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    (document.querySelector("#fileInput").value = "")
                  }
                >
                  remover
                </button>
              </div>
              <div className="mt-4">
                {!validar ? (
                  <button className="btn btn-primary" onClick={enviar}>
                    Validar
                  </button>
                ) : (
                  ""
                )}

                {validar ? (
                  <button className="btn btn-success" onClick={atualizar}>
                    Atualizar
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            {message.length !== 0 ? (
              <>
                {message.map((err, i) => (
                  <div key={i}>
                    <p className="text-danger">{err}</p>
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
            {success.length !== 0 ? (
              <>
                {success.map((success, i) => (
                  <div key={i}>
                    <p className="text-success">{success.success}</p>
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col" style={Style.grid2}>
          {load ? (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">nome</th>
                    <th scope="col">preço</th>
                    <th scope="col">novo preço</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((product, i) => (
                    <tr key={i}>
                      <th scope="row">{product.code}</th>
                      <th scope="row">{product.name}</th>
                      <th scope="row">
                        R${" "}
                        {product.sales_price
                          .toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                          .replace(".", ",")}
                      </th>
                      <th scope="row">
                        R${" "}
                        {product.new_price
                          .toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                          .replace(".", ",")}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </Fragment>
  );
};

const Style = {
  dash: {
    height: "80vh",
  },
  grid1: {
    borderRight: "1px solid #000",
    padding: "24px",
  },
  grid2: {
    padding: "24px",
  },
};
