import path from 'path'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const input = path.resolve( __dirname, './src/index.ts' )
const outDir = path.resolve( __dirname, './dist' )

function gen( params ) {
  const { fmt, forProd } = params

  return {
    input,
    output: {
      file: genName( params ),
      format: fmt,
      name: pkg.name,
      sourcemap: !!forProd,
    },
    plugins: [
      resolve( { extensions: [ '.ts' ] } ),
      // json(),
      babel( {
        babelHelpers: 'bundled',
        extensions: [ '.ts' ],
      } ),
      ...( forProd ? [ terser() ] : [] )
    ],
    onwarn( warning, rollupWarn ) {
      if ( warning.code !== 'CIRCULAR_DEPENDENCY' ) {
        rollupWarn( warning )
      }
    }
  }
}

function genName( { name, fmt, forProd } ) {
  const nameParts = [ name, fmt ]
  if ( typeof forProd === 'boolean' ) {
    nameParts.push( forProd ? 'production.min' : 'development' )
  }
  nameParts.push( 'js' )
  const outFile = nameParts.join( '.' )
  return path.resolve( outDir, outFile )
}

export default [
  gen( { name: pkg.name, fmt: 'cjs', forProd: false } ),
  gen( { name: pkg.name, fmt: 'cjs', forProd: true } ),
  gen( { name: 'index', fmt: 'esm' } ),
  gen( { name: 'index', fmt: 'umd' } ),
]
