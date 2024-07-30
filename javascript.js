var biblioteca = {

    'nome': 'Roberval Cardoso',

    'endereco': {'rua': 'XV de Novembro', 'numero': 40, 'CEP': '36200000'},

    'livros':[

        {'nome': 'Java como Programar', 'ano': 2019, 'quantidade': 15, 'emprestados': 10},

        {'nome': 'Aprendendo JavaScript', 'ano': 2020, 'quantidade': 3, 'emprestados': 0},

        {'nome': 'C Completo e Total', 'ano': 2015, 'quantidade': 25, 'emprestados': 10},

        {'nome': 'Web 2.0', 'ano': 2016, 'quantidade': 9, 'emprestados': 1},

        {'nome': 'Bancos de Dados Modernos', 'ano': 2000, 'quantidade': 18, 'emprestados': 0},

    ]

};

var btn = document.querySelector('#btn');
var nome = document.querySelector('#nome');
var endereco = document.querySelector('#endereco');
var livros = document.querySelector('#livros');
var x = 0;
var aux;

var btncad = document.querySelector('#btncad');
var nomenl = document.querySelector('#nomenl');
var anonl = document.querySelector('#anonl');
var qtdenl = document.querySelector('#qtdenl');
var empnl = document.querySelector('#empnl');

var totalLivros = 49;
var totalEmprestados = 21;
const ctx = document.getElementById('myChart');

chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Total de Livros', 'Emprestados'],
      datasets: [{
        data: [totalLivros, totalEmprestados],
        borderWidth: 1
      }]
    }});

btncad.onclick = function(e){
    var x = 0;
    if ((nomenl.value == '') || (anonl.value == '') || (qtdenl.value == '') || (empnl.value == '')){
        alert('Há campos obrigatórios não preenchidos, livro não será gravado!');
        return 0;
    }
    else{
        if (nomenl.value.length < 3){
            alert ('Nome tem de ter 3 ou mais caracteres!');
            return 0;
        }
        else{
            if ((anonl.value < 1300) || (anonl.value > 2024)){
                alert ('Ano não aceito!');
                return 0;
            }
            else{
                if ((qtdenl.value < 0) || (qtdenl.value > 1000)){
                    alert ('Valores de quantidade não aceito!');
                    return 0;
                }
                else{
                    if ((parseInt(empnl.value) < 0) || (parseInt(empnl.value) > parseInt(qtdenl.value))){
                        alert ('Valores de empréstimos não aceito!');
                        return 0;
                    }
                    else{
                        var validaNome = nomenl.value;
                        if (x == 0){
                            var i = 0;
                            for (i = 0; i < biblioteca['livros'].length; i++){
                                if (validaNome == biblioteca['livros'][i]['nome']){
                                    alert('Livro já cadastrado!');
                                    return 0;
                                }
                            }
                            biblioteca['livros'].push({'nome': nomenl.value, 'ano': anonl.value, 'quantidade': qtdenl.value, 'emprestados': empnl.value});
                            alert ('Livro cadastrado com sucesso!');
                            totalLivros = totalLivros + (parseInt(qtdenl.value) - parseInt(empnl.value));
                            totalEmprestados = totalEmprestados + parseInt(empnl.value);

                            chart.data.datasets[0].data = [totalLivros, totalEmprestados];
                            chart.update();
                            return 0;
                        }
                    }
                }
            }
        }
    }
}

btn.onclick = function(e){
    if (x == 0){
        x = 1;
        livros.innerHTML = '';
        campo.style.display = 'block';
        nome.innerHTML = 'Nome da biblioteca: ' + biblioteca['nome'];
        endereco.innerHTML = 'Endereço:' + '<p>' + 'Rua: ' + biblioteca['endereco']['rua'] + '</p>' + '<p>' + 'Número: ' + biblioteca['endereco']['numero'] + '</p>' + '<p>' + 'CEP: ' + biblioteca['endereco']['CEP'] + '</p>';
        for (var i = 0; i < biblioteca['livros'].length; i++){
            aux = '<div id="div_'+ i +'">' + '<p>' + 'Livro ' + (i + 1) + ': ' + biblioteca['livros'][i]['nome'] + '</p>' + '<p>' + 'Ano: ' + biblioteca['livros'][i]['ano'] + '</p>' + '<p>' + 'Quantidade: ' + biblioteca['livros'][i]['quantidade'] + '</p>' + '<p>' + 'Emprestados: ' + biblioteca['livros'][i]['emprestados'] + '</p>' + '<br><button onclick="confirma(' + i + ')" id="btnExcluir"><ion-icon name="trash-outline" id="iconeLixo"></ion-icon></button>' + '<button onclick="editarBib(' + i + ')" id="btnEditar"><ion-icon name="pencil-outline" id="iconeedit"></ion-icon></button>' + '<br><br><hr></hr><br>' + '</div>';
            livros.innerHTML = livros.innerHTML + aux;
        }
    }
    else{
        x = 0;
        campo.style.display = 'none';
    }
}

function confirma (index){
    if (confirm("Deseja mesmo excluir esse livro?") == true){
        biblioteca.livros.splice(index, 1);
        btn.click();
        btn.click();

        totalLivros = 0;
        totalEmprestados = 0;
        for (var x = 0; x < biblioteca['livros'].length; x++){
            totalLivros = totalLivros + parseInt(biblioteca['livros'][x]['quantidade']);
            totalEmprestados = totalEmprestados + parseInt(biblioteca['livros'][x]['emprestados']);
        }
        chart.data.datasets[0].data = [totalLivros, totalEmprestados];
        chart.update();
    }
}

var btneditarlivro = document.querySelector('#btneditarlivro');
var nvlivros = document.querySelector('#nvlivros');

nvlivros.onclick = function (e){
    nvlivros.style.display = 'none';
    btneditarlivro.style.display = 'none';
    btncad.style.display = 'block';
    nomenl.value = '';
    anonl.value = '';
    qtdenl.value = '';
    empnl.value = '';
}

nvlivros.style.display = 'none';

function editarBib (index){
    scrollTo(0, 0);
    nomenl.value = biblioteca['livros'][index]['nome'];
    anonl.value = biblioteca['livros'][index]['ano'];
    qtdenl.value = biblioteca['livros'][index]['quantidade'];
    empnl.value = biblioteca['livros'][index]['emprestados'];

    btncad.style.display = 'none';
    btneditarlivro.style.display = 'block';
    nvlivros.style.display = 'block';

    btneditarlivro.onclick = function (e){
        if ((nomenl.value == '') || (anonl.value == '') || (qtdenl.value == '') || (empnl.value == '')){
            alert('Há campos obrigatórios não preenchidos, livro não será gravado!');
            return 0;
        }
        else{
            if (nomenl.value.length < 3){
                alert ('Nome tem de ter 3 ou mais caracteres!');
                return 0;
            }
            else{
                if ((anonl.value < 1300) || (anonl.value > 2024)){
                    alert ('Ano não aceito!');
                    return 0;
                }
                else{
                    if ((qtdenl.value < 0) || (qtdenl.value > 1000)){
                        alert ('Valores de quantidade não aceito!');
                        return 0;
                    }
                    else{
                        if ((parseInt(empnl.value) < 0) || (parseInt(empnl.value) > parseInt(qtdenl.value))){
                            alert ('Valores de empréstimos não aceito!');
                            return 0;
                        }
                        else{
                            biblioteca['livros'][index]['nome'] = nomenl.value;
                            biblioteca['livros'][index]['ano'] = anonl.value;
                            biblioteca['livros'][index]['quantidade'] = qtdenl.value;
                            biblioteca['livros'][index]['emprestados'] = empnl.value;
                            alert ('Livro editado com sucesso!');
                            nomenl.value = '';
                            anonl.value = '';
                            qtdenl.value = '';
                            empnl.value = '';
                            nvlivros.style.display = 'none';
                            btneditarlivro.style.display = 'none';
                            btncad.style.display = 'block';

                            totalLivros = 0;
                            totalEmprestados = 0;
                            for (var x = 0; x < biblioteca['livros'].length; x++){
                                totalLivros = totalLivros + parseInt(biblioteca['livros'][x]['quantidade']);
                                totalEmprestados = totalEmprestados + parseInt(biblioteca['livros'][x]['emprestados']);
                            }
                            chart.data.datasets[0].data = [totalLivros, totalEmprestados];
                            chart.update();

                            btn.click();
                            btn.click();
                        }
                    }
                }
            }
        }
    }
}