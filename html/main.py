from flask import Flask, render_template, request
import datetime

app = Flask(__name__, template_folder="./")

saldo = 0
historico = []

@app.route('/prova')
def prova():
    return render_template('prova.html')

@app.route('/deposito')
def deposito():
    global saldo
    valor_digitado = request.args.get('valor_digitado')
    if valor_digitado != None:
        saldo += float(valor_digitado)
        historico.append('R$ ' + valor_digitado + ' depositados em ' + datetime.datetime.now().strftime("%d/%m/%Y %H:%M"))
    return render_template('deposito.html', saldo = saldo)

@app.route('/retirar')
def retirar():
    global saldo
    valor_digitado = request.args.get('valor_digitado')
    if valor_digitado != None:
        saldo -= float(valor_digitado)
        historico.append('R$ ' + valor_digitado + ' retirados em ' + datetime.datetime.now().strftime("%d/%m/%Y %H:%M"))
    return render_template('retirar.html', saldo = saldo)

@app.route('/tudo')
def tudo():
    return render_template('tudo.html', saldo = saldo)

@app.route('/retirar_tudo')
def retirar_tudo():
    global saldo
    historico.append('R$ ' + str(saldo) + ' retirados em ' + datetime.datetime.now().strftime("%d/%m/%Y %H:%M"))
    saldo = 0
    return render_template('tudo.html', saldo = saldo)

@app.route('/verificar')
def verificar():
    global saldo
    global historico
    return render_template('verificar.html', saldo = saldo, historico = historico)

if __name__ == '__main__':
    app.run()