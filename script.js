String.prototype.extenso = function (c) {
  var ex = [
    ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
    ["dez", "vinte", "trinta", "quarenta", "cinqüenta", "sessenta", "setenta", "oitenta", "noventa"],
    ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
    ["mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão"]
  ];
  var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
  for (var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []) {
    j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
    if (!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
    for (a = -1, l = v.length; ++a < l; t = "") {
      if (!(i = v[a] * 1)) continue;
      i % 100 < 20 && (t += ex[0][i % 100]) ||
        i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
      s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
        ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
    }
    a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
    a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
  }
  return r.join(e) + " reais";
}


const buttons = document.querySelectorAll('.date');
if (buttons.length > 0) {
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
    });
  });
} else {
  console.warn('Nenhum botão encontrado com o seletor fornecido.');
}

window.onload = function () {
  const inputMes = document.getElementById("mes");
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // meses são de 0 a 11

  inputMes.value = `${ano}-${mes}`; // formato: YYYY-MM
}


// Acessando o jsPDF via global (window)
const { jsPDF } = window.jspdf;

// Exemplo de uso
document.getElementById('gerarPdf').addEventListener('click', () => {
  const novaJanela = window.open("", "_blank");

  const datasAulas = document.querySelectorAll('.selected');
  const numeroTotalAulas = (datasAulas.length * 2);
  const valorAulas = numeroTotalAulas * 100;
  const valorAulasExtenso = valorAulas.toString().extenso();
  const mesAnoAulas = document.querySelector('#mes').value;

  // Adiciona um dia fictício (ex: dia 1) para que seja uma data válida
  const data = new Date(mesAnoAulas + "-10");
  console.log(data.getUTCMonth() + "/" + data.getFullYear())

  // Formata no estilo "Fevereiro de 2025"
  const formatador = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric"
  });

  const mesAnoAulaRecibo = formatador.format(data);
  console.log(mesAnoAulaRecibo)


  const titulo = ("RECIBO");
  const subTitulo = ("ATENDIMENTO TERAPÊUTICO - AT ESCOLAR - DIR FLOORTIME");
  const corpo = ("Eu, ELISSANDRA ELAYNE MARTINS DOS SANTOS RAMOS, inscrita sob o CPF 070.365.384-90, declaro que recebi da CASSI JOÃO PESSOA - CNPJ 33.719.485/0023-32 - Av. Júlia Freire, 1200, Edifício Metropolitan, 7º andar, Bairro Expedicionários, João Pessoa (PB), CEP 58.041-000, a importância de R$ " + valorAulas + " (" + valorAulasExtenso + "), sendo " + numeroTotalAulas + " sessões, duas sessões por dia com valor Unitário de R$ 100,00, referente ao procedimento de Atendimento Terapêutico - (DIR FLOORTIME) ao menor VINICIUS PESSOA OLIVEIRA ORTINS inscrito sob o CPF 119.197.084-13, nos dias " + Array.from(datasAulas).map(dataAula => dataAula.innerHTML).join(', ') + " de " + mesAnoAulaRecibo + ".");

  const conteudoHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <title>Documento para Impressão</title>
          <style>
            html, body, div, span, applet, object, iframe,
            h1, h2, h3, h4, h5, h6, p, blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, ol, ul, li,
            fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed, 
            figure, figcaption, footer, header, hgroup, 
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video {
            	margin: 0;
            	padding: 0;
            	border: 0;
            	font-size: 100%;
            	font: inherit;
            	vertical-align: baseline;
            }
            /* HTML5 display-role reset for older browsers */
            article, aside, details, figcaption, figure, 
            footer, header, hgroup, menu, nav, section {
            	display: block;
            }
            body {
            	line-height: 1;
            }
            ol, ul {
            	list-style: none;
            }
            blockquote, q {
            	quotes: none;
            }
            blockquote:before, blockquote:after,
            q:before, q:after {
            	content: '';
            	content: none;
            }
            table {
            	border-collapse: collapse;
            	border-spacing: 0;
            }
            @page {
              size: A4;
            }

            body {
              width: 210mm;
              height: 297mm;
              margin: 0 auto;
              padding: 2cm;
              font-family: Calibri, sans-serif;
              font-size: 14px;
              box-sizing: border-box;
            }

            .conteudo {
              white-space: pre-wrap;
            }

            .titulo, .sub-titulo{
              text-align: center;
              text-decoration: underline
            }

          </style>
        </head>
        <body>
          <div class="conteudo">
            <div class="titulo">${titulo}</div>
            <div class="sub-titulo">${subTitulo}</div>
           
            <div class="corpo">${corpo}</div>
          </div>
          <div style="width: 80%; margin: 60px auto 20px auto; text-align: center;">
              <hr style="border: none; border-bottom: 1px solid #000;">
              <p style="margin-top: 5px;">Elissandra Elayne Martins dos Santos Ramos / CPF 070.365.384-90</p>
            </div>
          <script>
          </script>
        </body>
        </html>
      `;

  novaJanela.document.open();
  novaJanela.document.write(conteudoHTML);
  novaJanela.document.close();
});

document.getElementById('gerarFrequencia').addEventListener('click', () => {
  const novaJanela = window.open("", "_blank");

  const datasAulas = document.querySelectorAll('.selected');
  const numeroTotalAulas = (datasAulas.length * 2);
  const valorAulas = numeroTotalAulas * 100;
  const valorAulasExtenso = valorAulas.toString().extenso();
  const mesAnoAulas = document.querySelector('#mes').value;
  const tabela = document.querySelector('.tabela');
  var contador = 1;
  // Adiciona um dia fictício (ex: dia 1) para que seja uma data válida
  const data = new Date(mesAnoAulas + "-10");

  // Formata no estilo "Fevereiro de 2025"
  const formatador = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  });
  const formatadorAno = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
  });
  
  const mesAnoAulaRecibo = formatador.format(data);


  const titulo = (`FREQUÊNCIA DE ${mesAnoAulaRecibo.toUpperCase()}`);
  const subTitulo = (`R$ ${valorAulas},00`);
  const corpo = `A receber da Caixa de Assistência dos Funcionários do Banco do Brasil, Unidade PB, o valor de R$ ${valorAulas},00 (${valorAulasExtenso}). Referente a ${numeroTotalAulas} sessões de terapias pedagógicas (com duração de 01 horas cada), especializada no método DIR/Floortime, realizadas com o menor Vinícius Pessoa Oliveira Ortins. Tais terapias aconteceram no ano de ${formatadorAno.format(data)} durante o mês de ${formatador.format(data)}.`;

  const conteudoHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <title>Documento para Impressão</title>
          <style>
            html, body, div, span, applet, object, iframe,
            h1, h2, h3, h4, h5, h6, p, blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, ol, ul, li,
            fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed, 
            figure, figcaption, footer, header, hgroup, 
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video {
            	margin: 0;
            	padding: 0;
            	border: 0;
            	font-size: 100%;
            	font: inherit;
            	vertical-align: baseline;
            }
            /* HTML5 display-role reset for older browsers */
            article, aside, details, figcaption, figure, 
            footer, header, hgroup, menu, nav, section {
            	display: block;
            }
            body {
            	line-height: 1;
            }
            ol, ul {
            	list-style: none;
            }
            blockquote, q {
            	quotes: none;
            }
            blockquote:before, blockquote:after,
            q:before, q:after {
            	content: '';
            	content: none;
            }
            table {
            	border-collapse: collapse;
            	border-spacing: 0;
            }
            @page {
              size: A4;
            }

            body {
              width: 210mm;
              height: 297mm;
              margin: 0 auto;
              padding: 2cm;
              font-family: Calibri, sans-serif;
              font-size: 12px;
              box-sizing: border-box;
            }

            .conteudo {
              white-space: pre-wrap;
            }

            .titulo{
              text-align: center;
              text-decoration: underline
            }

            .sub-titulo {
              text-align: start;
            }
            
            th, td {
              border: 1px solid black;
              padding: 1px 0px 1px 5px;
            }
            
            table {
              width: 100%;
            }
            .dataEmissao {
              padding: 0px;
              marging: 0px;
            }

            .dataAssinatura {
              text-align: end;
              padding-right: 15%;
            }

          </style>
        </head>
        <body>
          <div class="conteudo">
            <div class="titulo">${titulo}</div>
            <div class="sub-titulo">${subTitulo}</div>
            <div class="corpo">${corpo}</div>

            <table class=tabela>
              <thead>
                <td>DATA</td>
                <td>HORARIO DE ATENDMENTO</td>
                <td>VALOR/SESSÃO</td>
                <td>ASSINATURA RESPONSÁVEL</td>
              </thead>
              ${Array.from(datasAulas).map(dataAula => {
                  const linha1 = `<tr><td>${contador++}ª ${dataAula.innerHTML}/${data.getMonth()}/${data.getFullYear()}</td>
                  <td>08:00 às 09:00</td>
                  <td>R$ 100,00</td>
                  <td></td></tr>`;
                  const linha2 = `<tr><td>${contador++}ª ${dataAula.innerHTML}/${data.getMonth()}/${data.getFullYear()}</td>
                  <td>09:00 às 10:00</td>
                  <td>R$ 100,00</td>
                  <td></td></tr>`;
                return linha1 + linha2;
              }).join('')}
            </table>
            <p class=dataAssinatura>João Pessoa, 30 de ${formatador.format(data)} de ${formatadorAno.format(data)}</p>
            <div style="width: 80%; margin: 60px auto 20px auto; text-align: center;">
              <hr style="border: none; border-bottom: 1px solid #000;">
              <p style="margin-top: 5px;">Elissandra Elayne Martins dos Santos Ramos / CPF 070.365.384-90</p>
            </div>
          </div>
          <script>
          </script>
        </body>
        </html>
      `;

  novaJanela.document.open();
  novaJanela.document.write(conteudoHTML);
  novaJanela.document.close();
})


