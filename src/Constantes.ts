export const COMBUSTIBLE_INICIO_REACTOR = 210
export const CONSUMO_COMBUSTIBLE_BASICO = 1
export const TEMPERATURA_CRITICO = 330
export const TEMPERATURA_EMERGENCIA = 400
export const DESGASTE_BARRA = 50
export const BARRA_ENERGIA_MINIMA = 50
export const DIVISOR_PRODUCCION_ENERGIA_TERMICA = 3600
export const BARRA_VIDA_MAX = 200
export const BARRA_VIDA_MIN = 0
export const REDUCCION_TEMPERATURA_APAGADO = 200

export const CONVERSION_TEMPERATURA_A_TERMICA = (n : number) => {
    return n * 8 - 140;
}
export const CONVERSION_TERMICA_A_TEMPERATURA = (n : number) => {
    return (n + 140) / 8;
}
export const CONVERSION_TERMICA_A_ELECTRICA = (n : number) => {
    return n * 1.75 - 3675;
}