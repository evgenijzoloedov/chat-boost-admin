import numeral from 'numeral';
import * as stream from "stream";
import {NumberOrString} from "../types/general";

// ----------------------------------------------------------------------

export function fCurrency(number: string | number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number: string | number) {
  return numeral(number).format('0.0 b');
}




export function fSum(a:NumberOrString,b:NumberOrString){
  return numeral(a).add(b).format('0,00')
}
export function fDivide(a:NumberOrString,b:NumberOrString){
  return numeral(a).divide(b).format('0,00')
}

export function fMultiply(a:NumberOrString,b:NumberOrString){
  return numeral(a).multiply(b).format('0,00')
}


